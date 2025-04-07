import { Request, Response } from "express";
import { UserModel } from "../models/usersModel";
import { Tables } from "../database.types";
import { UserSchema } from "../schema/users";
import { refreshAccessToken, verifyAccessToken } from "../utils/jwt";

const model = new UserModel();

export class UserController {

  async createPatient(req: Request, res: Response): Promise<any> {
    try {
      req.body.password_hash = req.body.password
      const parsed = UserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid user data",
          details: parsed.error.format(),
        });
      }

      const user = parsed.data as Tables<"users">;
      const result = await model.createPatient(user);
      if ("error" in result) return res.status(400).json(result);
      
      res.status(201).json({
        uuid: result.uuid,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        role:result.role

      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createDoctor(req: Request, res: Response): Promise<any> {
    try {
      const parsed = UserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid user data",
          details: parsed.error.format(),
        });
      }

      const user = parsed.data as Tables<"users">;
      const result = await model.createDoctor(user);
      if ("error" in result) return res.status(400).json(result);

      res.status(201).json({
        uuid: result.uuid,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        role:result.role

      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createAdmin(req: Request, res: Response): Promise<any> {
    try {
      const parsed = UserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid user data",
          details: parsed.error.format(),
        });
      }

      const user = parsed.data as Tables<"users">;
      const result = await model.createAdmin(user);
      if ("error" in result) return res.status(400).json(result);

      res.status(201).json({
        uuid: result.uuid,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        role:result.role
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async signIn(req: Request, res: Response): Promise<any> {
    try {
      const { username, password } = req.body;
      const result = await model.signIn(username, password);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json({
        uuid: result.uuid,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        role:result.role
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async status(req: Request, res: Response): Promise<any> {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        return res.status(400).json({ error: "Authorization header is missing" });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(400).json({ error: "Token is missing" });
      }

      const decoded = verifyAccessToken(token); 
      if (!decoded) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      res.status(200).json({
        message: "Token is valid",
        role: decoded.role
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  async refresh(req: Request, res: Response): Promise<any> {
    const { refreshToken } = req.body;
  
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }
  
    const {newAccessToken,role} = refreshAccessToken(refreshToken) as any;
  
    if (!newAccessToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
  
    res.status(200).json({ accessToken: newAccessToken ,role});
  }
  async getById(req: Request, res: Response): Promise<any> {
    try {
      const { userId } = req.params;
      const result = await model.getUserById(userId);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const result = await model.getAllUsers();
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { userId } = req.params;
      const updatedUser: Partial<Tables<"users">> = req.body;
      const result = await model.updateUser(userId, updatedUser);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { userId } = req.params;
      const result = await model.deleteUser(userId);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
