import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/env";

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, config.jwt.accessSecret!, {
    expiresIn: config.jwt.accessTtl,
  } as SignOptions);
};

export const signRefreshToken = (payload: object) => {
  return jwt.sign(payload, config.jwt.refreshSecret!, {
    expiresIn: config.jwt.refreshTtl,
  } as SignOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.jwt.accessSecret!);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwt.refreshSecret!);
};
