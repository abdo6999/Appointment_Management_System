import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../env"; // assuming you have environment variables for your JWT secret

// Custom error handling for unauthorized access
class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticate = (allowedRoles: string[] = []):any => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ error: "Authorization token is required" });
    }

    try {
      const decoded: any = jwt.verify(token, ENV.SECRET_KEY); 

      // Ensure that the decoded payload contains a role
      if (!decoded.role) {
        throw new UnauthorizedError("No role found in token");
      }

      // Check if the role in the token matches one of the allowed roles
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: "Access denied. Insufficient permissions." });
      }

      req.user = decoded;
      next(); 
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return res.status(401).json({ error: error.message });
      }
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};
