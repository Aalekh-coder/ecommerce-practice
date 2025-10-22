import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import {
  CLOUDINARY_NAME,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
} from "../config/env.js";


cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();

export async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

export const upload = multer({ storage });


