import { Router } from "express";
import { login, logout, register } from "../../controllers/auth/auth-controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

export default authRouter;
