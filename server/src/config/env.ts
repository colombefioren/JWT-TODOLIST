import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 7001,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessTtl: process.env.ACCESS_TOKEN_TTL || "15m",
    refreshTtl: process.env.REFRESH_TOKEN_TTL || "7d",
  },
};

if (!config.jwt.accessSecret || !config.jwt.refreshSecret) {
  throw new Error("Missing JWT secrets in .env");
}

export default config;
