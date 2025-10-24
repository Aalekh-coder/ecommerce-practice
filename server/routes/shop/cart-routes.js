import { Router } from "express";
import {
  addToCart,
  deleteCartItems,
  fetchCartItems,
  updateCartItemsQuantity,
} from "../../controllers/shop/cart-controller.js";
const cartRoute = Router();

cartRoute.post("/add", addToCart);
cartRoute.get("/get/:userId", fetchCartItems);
cartRoute.put("/update-cart", updateCartItemsQuantity);
cartRoute.delete("/:userId/:productId", deleteCartItems);

export default cartRoute;
