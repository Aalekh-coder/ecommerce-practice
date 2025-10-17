import { Router } from "express";
import { authMiddleware, login, logout, register } from "../../controllers/auth/auth-controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/check-auth", authMiddleware,(req,res)=>{
    const user = req.user;
    return  res.status(200).json({
        success:true,
        message:"Authenticated User",
        user
    })
});

export default authRouter;
