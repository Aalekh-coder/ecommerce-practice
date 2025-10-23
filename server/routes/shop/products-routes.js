import { Router } from "express";
import { getFilteredProduct, getProductsDetails } from "../../controllers/shop/products-controller.js";

const productRoute = Router();

productRoute.get("/get", getFilteredProduct);
productRoute.get("/get/:id", getProductsDetails);

export default productRoute;
