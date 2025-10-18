import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import cloudinaryConfig from '../config/cloudinary.js';

cloudinary.config(cloudinaryConfig);

const storage = new multer.memoryStorage();

export async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  
  return result;
}

export const upload = multer({ storage });