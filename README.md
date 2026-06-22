<!--
  framewright — a community continuation of Theatre.js.
  The README below is largely the original Theatre.js documentation; the prose,
  demo assets, and external links still reference upstream Theatre.js for now.
-->

> 🎬 **framewright** is a community continuation of
> [Theatre.js](https://github.com/theatre-js/theatre), whose public development
> stopped in 2024. This repository keeps the original git history and licensing
> (Apache-2.0 for the runtime, AGPL-3.0 for the studio) and modernizes the
> toolchain for current environments (Node 24 LTS, TypeScript 5.9, Vite 8, Jest
> 30, esbuild 0.28). It is **not affiliated with or endorsed by** the original
> Theatre.js team. Packages are published under the `@framewright/*` scope; the
> docs and demo assets below still reference upstream Theatre.js for now.

<h1 align="center">framewright</h1>
<p align="center">Motion Design, for the web</p>

> ℹ️ Upstream context: in 2024 the original Theatre.js team _temporarily_ moved
> development to a private repo to build a 1.0, and the public repo has been
> dormant since. **framewright** continues from that last public snapshot.

Theatre.js is an animation library for high-fidelity motion graphics. It is
designed to help you express detailed animation, enabling you to create
intricate movement, and convey nuance.

Theatre.js can be used both programmatically _and_ visually.

---

You can use Theatre.js to:

- Animate 3D objects made with THREE.js or other 3D libraries

  ![s](https://raw.githubusercontent.com/AriaMinaei/theatre-docs/main/docs/.vuepress/public/preview-3d-short.gif)

  <sub>Art by
  [drei.lu](https://sketchfab.com/models/91964c1ce1a34c3985b6257441efa500)</sub>

- Animate HTML/SVG via React or other libraries

  ![s](https://raw.githubusercontent.com/AriaMinaei/theatre-docs/main/docs/.vuepress/public/preview-dom.gif)

- Design micro-interactions

  ![s](https://raw.githubusercontent.com/AriaMinaei/theatre-docs/main/docs/.vuepress/public/preview-micro-interaction.gif)

- Choreograph generative interactive art

  ![s](https://raw.githubusercontent.com/AriaMinaei/theatre-docs/main/docs/.vuepress/public/preview-generative.gif)

- Or animate any other JS variable

  ![s](https://raw.githubusercontent.com/AriaMinaei/theatre-docs/main/docs/.vuepress/public/preview-console.gif)

## Documentation and Tutorials

The original Theatre.js docs are at
[theatrejs.com/docs](https://www.theatrejs.com/docs) — the API is still
compatible with framewright, so they remain the best reference for now.

- Video tutorials (upstream Theatre.js):
  - [Crash course](https://www.youtube.com/watch?v=icR9EIS1q34)
  - [Animating with music](https://www.youtube.com/watch?v=QoS4gMxwq_4)
  - [Yuri Artiukh](https://twitter.com/akella)'s
    [stream](https://youtu.be/qmRqgFbNprM?t=3462) with a section on using
    Theatre.js with THREE.js
  - \<Add your own tutorials here\>

## Community and support

For framewright questions, bugs, and discussion, use the
[GitHub Issues and Discussions](https://github.com/kiyeonjeon21/framewright/issues)
on this repo.

The original Theatre.js community channels (upstream, dormant since 2024):
[Discord](https://discord.gg/bm9f8F9Y9N) ·
[@theatre_js](https://twitter.com/theatre_js) ·
[hello@theatrejs.com](mailto:hello@theatrejs.com)

## Development and contributing

If you want to change the source of Theatre, have a look at the guide
[here](./CONTRIBUTING.md).

### Proposing fixes and changes

Open an [issue](https://github.com/kiyeonjeon21/framewright/issues) on this repo
to report bugs or propose changes. Pull requests are welcome.

### Helping with outstanding issues

Feel free to chime in on any
[issue](https://github.com/kiyeonjeon21/framewright/issues). Issues labeled
["Help wanted"](https://github.com/kiyeonjeon21/framewright/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
or
["Good first issue"](https://github.com/kiyeonjeon21/framewright/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
are good starting points.

### Helping with documentation

The original Theatre.js documentation repo is
[theatre-js/theatre-docs](https://github.com/theatre-js/theatre-docs/)
(upstream, maintained by the original team). framewright-specific doc changes
can be proposed via issues on this repo.

### Writing/recording tutorials

If you make tutorials or video content about framewright or Theatre.js, open an
issue or PR to add a link here.

## License

Your use of Theatre.js is governed under the Apache License Version 2.0:

- Theatre's core (`@framewright/core`) is released under the Apache License. Same
  goes for most packages in this repository.
- The studio (`@framewright/studio`) is released under the AGPL 3.0 License. This is
  the package that you use to edit your animations, setup your scenes, etc. You
  only use the studio during design/development. Your project's final bundle
  only includes `@framewright/core`, so only the Apache License applies.
