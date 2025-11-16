import { Router } from "express";
import { getAllOrdersOfAllUser, getOrderDetailsForAdmin, updateOrderStatus } from "../../controllers/admin/order-controller.js";
const orderRoute = Router();

orderRoute.get("/get",getAllOrdersOfAllUser)
orderRoute.get("/details/:id",getOrderDetailsForAdmin)
orderRoute.put("/update/:id",updateOrderStatus)

export default orderRoute;
