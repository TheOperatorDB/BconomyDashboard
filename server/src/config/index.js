import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV || "development",
  apiKey: process.env.MY_BCONOMY_API_KEY,
  allowedOrigin: "http://localhost:5173",
};
