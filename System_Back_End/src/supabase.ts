import { createClient } from '@supabase/supabase-js'

import { Database } from './database.types'
import { ENV } from './env'

const supabase = createClient<Database>(
  ENV.SUPABASE_URL_LOCAL!,
  ENV.SUPABASE_ANON_KEY_LOCAL!
)

export {supabase}