import { Router } from "express";
import { getFilteredProduct } from "../../controllers/shop/products-controller.js";

const productRoute = Router();

productRoute.get("/get", getFilteredProduct );

export default productRoute;
