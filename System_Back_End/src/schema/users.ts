import { z } from "zod";

// Enum for user roles (this assumes you have an Enum "user_role" in your database schema)
export const UserRoleEnum = z.enum(['doctor', 'patient', 'admin']);

// The schema for creating/updating a user
export const UserSchema = z.object({
  id: z.string().uuid().optional(), 
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3, "Username should have at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password_hash: z.string().min(6, "Password should have at least 6 characters"), 
  phone: z.string().nullable().optional(), 
  profile_image: z.string().nullable().optional(), 
  role: UserRoleEnum.optional(), 
  created_at: z.string().nullable().optional(), 
  updated_at: z.string().nullable().optional(), 
}).refine((data) => data.password_hash != null || data.id != null, {
  message: "Either password_hash or id must be provided",
  path: ["password_hash", "id"],
});
