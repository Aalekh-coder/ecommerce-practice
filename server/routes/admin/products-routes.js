import { Router } from "express";
import { upload } from "../../helper/cloudinary.js";
import handleImageUpload from "../../controllers/admin/product-controller.js";

const ProductRoutes = Router();
ProductRoutes.post("/upload-image",upload.single("my_file"),handleImageUpload);

export default ProductRoutes