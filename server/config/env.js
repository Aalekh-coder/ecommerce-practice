import { config } from "dotenv";

config({ path: ".env.local", debug: false });

export const {
  PORT,
  MONGO_URI,
  SECRET,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_NAME,
  CLIENT_URL,
} = process.env;
