import { config } from "dotenv";
config(); 

export const ENV = {
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  SUPABASE_URL_LOCAL: process.env.SUPABASE_URL_LOCAL || "",
  SUPABASE_ANON_KEY_LOCAL: process.env.SUPABASE_ANON_KEY_LOCAL || "",
  PEPPER: process.env.PEPPER || "",
  SECRET_KEY: process.env.SECRET_KEY || "",
  SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || "",
};
