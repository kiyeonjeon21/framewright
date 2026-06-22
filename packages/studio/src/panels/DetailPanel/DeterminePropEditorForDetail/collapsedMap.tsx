import type {Atom, Pointer} from '@framewright/dataverse'

export const collapsedMap = new WeakMap<Pointer<{}>, Atom<boolean>>()
