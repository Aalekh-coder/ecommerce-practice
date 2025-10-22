import { Router } from "express";
import { upload } from "../../helper/cloudinary.js";
import { addProduct, addProductsBulk, deleteProduct, editProduct, fetchAllProduct, handleImageUpload } from "../../controllers/admin/product-controller.js";


const productRoutes = Router();

productRoutes.post("/upload-image", upload.single("my_file"), handleImageUpload);


productRoutes.post("/add",addProduct)
productRoutes.put("/edit/:id",editProduct)
productRoutes.delete("/delete/:id",deleteProduct)
productRoutes.get("/get",fetchAllProduct)
productRoutes.post("/bulk",addProductsBulk)


export default productRoutes