import bcrypt from "bcryptjs";
import { Tables } from "../database.types";
import { supabase } from "../supabase";
import { ENV } from "../env";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";

export class UserModel {
  async createPatient(user: Tables<"users">) {
    if (!ENV.PEPPER || !ENV.SECRET_KEY || !ENV.SECRET_REFRESH_KEY) {
      return { error: "Missing environment variables" };
    }

    const pepperedPassword = user.password_hash + ENV.PEPPER;
    const hashedPassword = await bcrypt.hash(pepperedPassword, 10);

    const { data, error } = await supabase
      .from("users")
      .insert({ ...user, password_hash: hashedPassword })
      .select("*")
      .single();
      if (error) return { error: error.message };
      await supabase
      .from("patients")
      .insert({id:data.id} as any)

    const payload = {
      id: data.id,
      role: "patient",
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { uuid:data.id, accessToken, refreshToken,role:payload.role };
  }

  async createDoctor(user: Tables<"users">) {
    if (!ENV.PEPPER || !ENV.SECRET_KEY || !ENV.SECRET_REFRESH_KEY) {
      return { error: "Missing environment variables" };
    }

    const pepperedPassword = user.password_hash + ENV.PEPPER;
    const hashedPassword = await bcrypt.hash(pepperedPassword, 10);

    const { data, error } = await supabase
      .from("users")
      .insert({ ...user, password_hash: hashedPassword })
      .select("*")
      .single();

    if (error) return { error: error.message };

    const payload = {
      id: data.id,
      role: "doctor",
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { uuid: data.id, accessToken, refreshToken,role:payload.role };
  }


  async createAdmin(user: Tables<"users">) {
    if (!ENV.PEPPER || !ENV.SECRET_KEY || !ENV.SECRET_REFRESH_KEY) {
      return { error: "Missing environment variables" };
    }

    const pepperedPassword = user.password_hash + ENV.PEPPER;
    const hashedPassword = await bcrypt.hash(pepperedPassword, 10);

    const { data, error } = await supabase
      .from("users")
      .insert({ ...user, password_hash: hashedPassword })
      .select("*")
      .single();

    if (error) return { error: error.message };

    const payload = {
      id: data.id,
      role: "admin",  // Role as admin
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { uuid: data.id, accessToken, refreshToken,role:payload.role };
  }
  
  async signIn(username: string, password: string) {
    if (!ENV.PEPPER || !ENV.SECRET_KEY || !ENV.SECRET_REFRESH_KEY) {
      return { error: "Missing environment variables" };
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !user) return { error: "User not found" };

    const pepperedPassword = password + ENV.PEPPER;
    const isPasswordMatch = await bcrypt.compare(pepperedPassword, user.password_hash);

    if (!isPasswordMatch) return { error: "Invalid credentials" };

    const payload = {
      id: user.id,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {uuid:user.id, accessToken, refreshToken,role:user.role };
  }

  async getUserById(userId: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) return { error: error.message };
    return data;
  }

  async getAllUsers() {
    const { data, error } = await supabase.from("users").select("*");
    if (error) return { error: error.message };
    return data;
  }

  async updateUser(userId: string, updatedUser: Partial<Tables<"users">>) {
    const { data, error } = await supabase
      .from("users")
      .update(updatedUser)
      .eq("id", userId)
      .select("*")
      .single();

    if (error) return { error: error.message };
    return data;
  }

  async deleteUser(userId: string) {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId)
      .select("*")
      .single();

    if (error) return { error: error.message };
    return data;
  }
}
