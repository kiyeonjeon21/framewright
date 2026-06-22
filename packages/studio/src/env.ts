import type {Env} from '@framewright/core/envSchema'
import type {$IntentionalAny} from '@framewright/utils/types'

// process.env is guaranteed to be of type Env, because we validate it in `devEnv/cli`
export const env = process.env as $IntentionalAny as Env
