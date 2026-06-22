# Theatre.js (fork) — Claude Code guide

> This file is the context Claude Code agents read first when working in this
> repo. Human-facing contribution guide is `CONTRIBUTING.md`; short LLM-targeted
> notes are in `Notes.md`.

## What this is

**Theatre.js** — "Motion Design, for the web". A high-fidelity motion-graphics
animation library that you drive **both programmatically and via a visual
editor** (THREE.js/r3f 3D, DOM/SVG, or any JS variable).

This repo is a **snapshot fork** of the public OSS Theatre.js (last public
commit 2024-04-11). The original team moved to a private repo to build a
collaborative cloud "1.0", and this fork sits just before that point. The newer
packages (`saaz`/`app`/`sync-server`) are the traces of that pivot.

### ⚠️ Licensing (important — do not change unilaterally)

- `@framewright/core` and most packages = **Apache License 2.0** (runtime, ships in
  the final bundle)
- `@framewright/studio` = **AGPL 3.0** (visual editor, strong copyleft)
- Do **not** relicense (e.g. to MIT) the original files' license headers /
  `LICENSE` / `NOTICE`. Apache requires preserving notices; AGPL's copyleft
  extends to derivatives and network services. You may apply a different license
  only to brand-new files you author. Always confirm any license change with the
  human.

## Architecture (bottom to top)

```
dataverse  ── reactive FRP primitives (Atom/Pointer/Prism/Ticker). Heart of all reactivity.
  └─ core  ── public animation API + playback engine. Domain model: Project→Sheet→SheetObject→Sequence→Track→Keyframe.   [Apache]
       ├─ studio        ── visual editor UI. Edits state via studio.transaction()→Saaz.                                  [AGPL]
       ├─ react / theatric ── React bindings (usePrism/useVal), lightweight useControls() panels.
       ├─ r3f           ── THREE.js / react-three-fiber integration (the 3D part) + 3D editor extension.
       └─ browser-bundles ── UMD builds for <script> tags.
New 1.0 cloud axis (mostly stubs):
  saaz(offline-first collaborative sync engine) ── sync-server(WebSocket+tRPC) ── app(Next.js, teams/workspaces, OAuth device flow)
```

## Monorepo layout (`packages/*`)

| Package                                        | Version   | Description                                            |
| ---------------------------------------------- | --------- | ------------------------------------------------------ |
| `@framewright/dataverse`                           | 0.7.0     | Reactive dataflow (FRP) foundation library             |
| `@framewright/core`                                | 0.7.0     | Animation engine + public API (Apache)                 |
| `@framewright/studio`                              | 0.7.0     | Visual editor (AGPL)                                   |
| `@framewright/react`                               | 0.7.0     | React hook bindings                                    |
| `@framewright/r3f`                                 | 0.7.0     | react-three-fiber / THREE.js 3D extension              |
| `theatric`                                     | 0.7.0     | Lightweight `useControls()` wrapper                    |
| `@framewright/browser-bundles`                     | 0.7.0     | UMD bundles                                            |
| `@framewright/saaz`                                | 0.7.0     | Collaborative sync/state engine (new)                  |
| `@framewright/app`                                 | **0.1.0** | Next.js cloud web app (new, **unfinished stub**)       |
| `@framewright/sync-server`                         | **0.1.0** | Sync backend (new, **DB persistence not implemented**) |
| `playground`                                   | —         | Vite dev/experiment environment + e2e tests            |
| `benchmarks`, `utils`, `dataverse-experiments` | —         | Auxiliary                                              |

`app`/`sync-server` at 0.1.0 = code that was just started right before the
private pivot, and is unfinished. Do not assume it works.

## Non-obvious mental models (must understand)

- **dataverse**: `Atom` (mutable state) · `Pointer` (type-safe reference to a
  nested path, Proxy+WeakMap) · `Prism` (reactive computed value; 3 states
  Cold→Stale→Fresh; automatic dependency tracking) · `Ticker` (RAF frame
  batching). Propagation flow: **value changes → dependent Prisms go Stale →
  recomputed in topological order on the next tick → onChange notified →
  screen**. One frame = one update cycle.
- **core value layering**: an object's value is composed in order
  `defaults(prop type) → initial → statics(editor-fixed) → sequenced(keyframes, highest priority)`
  via `deepMergeWithCache`. (`SheetObject.getValues()`)
- **interpolation**: per track, find the keyframe pair bracketing the current
  position, apply Bezier easing/hold, then the prop-type's `interpolate()`.
  number=linear, rgba=OkLab blend, string=hold. Key file
  `packages/core/src/sequences/interpolationTripleAtPosition.ts`.
- **core ↔ studio**: each registers itself as a global
  (`window.__TheatreJS_CoreBundle` / `__TheatreJS_StudioBundle`); whichever
  loads second discovers the other and connects. Edits go through
  `studio.transaction(fn)` → Saaz transactions (historic/ahistoric/ephemeral
  slices, Immer drafts).
- **saaz**: collaborative engine built on deterministic transaction replay
  (optimistic update queue / undo / 30ms presence / IDB persistence).
  sync-server exposes it remotely over tRPC, but **server-side DB persistence is
  not implemented**.

For deeper design, ask the `engine-guide` (engine/domain) or `studio-ui-guide`
(UI/r3f) subagents.

## Commands (yarn 3 — do not use npm)

Use Node 24 LTS (`.nvmrc`): `nvm use`. yarn 3.6.3 is vendored at
`.yarn/releases/`; if `yarn` isn't on your PATH (e.g. corepack unavailable),
run it directly: `node .yarn/releases/yarn-3.6.3.cjs <cmd>`.

```sh
yarn                 # install deps (yarn workspaces; corepack pins yarn@3.6.3)
yarn postinstall     # husky + prisma generate for app & sync-server (needed after install)
yarn playground      # dev: Vite hot-reload (fastest path to experiment)
yarn cli build       # build all packages (order: dataverse→saaz→core→studio→react→r3f→theatric→browser-bundles)
yarn typecheck       # = tsc --build (whole-repo typecheck). --watch works
yarn test            # jest unit/integration (.test.ts/.tsx). --watch works
yarn test:e2e        # Playwright e2e in the playground
yarn lint:all        # eslint (custom rulesdir). --fix works
yarn cli release x.y.z   # publish to npm
```

For examples (`examples/dom-cra`, `examples/r3f-cra`): run `yarn cli build`
first, then `yarn start` in the example folder.

## Code conventions

- **No relative imports across packages** — custom eslint rule
  `no-relative-imports` (`devEnv/eslint/rules/`). Import packages by alias/name.
- **Public/internal split**: `TheatreX` (public API wrapper) + `X` (internal
  implementation). Types: `types/public.ts` (user-facing) vs `types/private/`
  (internal).
- Lazy init via the `getOrCreate` pattern. Metadata stored in WeakMaps.
- Prettier enforced (husky + lint-staged). Auto-formats before commit.
- studio UI renders into a ShadowRoot + styled-components + reakit.

## Gotchas

- **No `npm install`** — yarn 3 only. node **>=22** (`package.json` engines);
  `.nvmrc` pins Node 24 LTS. Build is green on Node 24.
- Modern Node (22+) needs `--no-experimental-strip-types` so tsx (not Node's
  native type-stripping) handles `.ts` build scripts — this is wired into the
  root `cli` script via `cross-env`. Without it, `require`/`__dirname` in
  `devEnv/*.ts` throw "not defined in ES module scope".
- Most **library deps are still ~2 years old** (TS 5.1 / Next 13 / esbuild 0.18,
  etc.); modernization is in progress. Use the `build-doctor` subagent for
  build/dep work.
- `app`/`sync-server` are unfinished stubs. Re-run `yarn postinstall` (generate)
  after Prisma schema/install changes.
- Do not change license headers (see Licensing above).

## Reference pointers

- `Notes.md` — short LLM notes; `CONTRIBUTING.md` — human contribution guide;
  per-package `README.md`.
- As you accumulate learnings about this repo, use the `claude-md-management`
  plugin's `/revise-claude-md` to update this file.
