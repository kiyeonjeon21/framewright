import type {PropTypeConfig} from '@framewright/core/types/public'

export type PropConfigForType<K extends PropTypeConfig['type']> = Extract<
  PropTypeConfig,
  {type: K}
>
