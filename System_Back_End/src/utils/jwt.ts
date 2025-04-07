import jwt from "jsonwebtoken";
import { ENV } from "../env";

const ACCESS_TOKEN_EXPIRY = "15m"; 
const REFRESH_TOKEN_EXPIRY = "7d"; 

export interface JwtPayload {
  id: string;
  role: string;
}

export const generateAccessToken = (payload: JwtPayload) => {
  try {
    return jwt.sign(payload, ENV.SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRY });
  } catch (error) {
    throw new Error("Failed to generate access token");
  }
};

export const generateRefreshToken = (payload: JwtPayload) => {
  try {
    return jwt.sign(payload, ENV.SECRET_REFRESH_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
  } catch (error) {
    throw new Error("Failed to generate refresh token");
  }
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ENV.SECRET_KEY) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, ENV.SECRET_REFRESH_KEY) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const refreshAccessToken = (refreshToken: string) => {
  try {
    const payload = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken({id:payload.id,role:payload.role}); // Generates a new access token

    return { newAccessToken, role: payload.role };
  } catch (error) {
    return null; 
  }
};
