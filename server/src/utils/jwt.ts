import jwt, { SignOptions } from "jsonwebtoken";

const accessTokenTTL: string = process.env.ACCESS_TOKEN_TTL || "15m";
const refreshTokenTTL: string = process.env.REFRESH_TOKEN_TTL || "7d";

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: accessTokenTTL,
  } as SignOptions);
};

export const signRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: refreshTokenTTL,
  } as SignOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
};
