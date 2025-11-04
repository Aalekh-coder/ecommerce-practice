import { Router } from "express";
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from "../../controllers/shop/address-controller.js";
const addressRoute = Router();


addressRoute.post("/add",addAddress);
addressRoute.get("/get/:userId", fetchAllAddress);
addressRoute.delete("/delete/:userId/:addressId", deleteAddress);
addressRoute.put("/update/:userId/:addressId",editAddress)

export default addressRoute;
