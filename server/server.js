import express, { json } from "express";
import {PORT} from "./config/env.js"
import connectDB from "./config/db.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import corsConfig from "./config/cors.js";
import authRouter from "./routes/auth/auth-routes.js";
import productRoutes from "./routes/admin/products-routes.js";
import shopProductsRoutes from "./routes/shop/products-routes.js";
import shopCartRoutes from "./routes/shop/cart-routes.js";

const app = express();

// middlewares
app.use(cors(corsConfig))
app.use(cookieParser());
app.use(json())

app.get("/",(req,res)=>{
    res.send("hello")
})

// routes
app.use("/api/auth",authRouter)
app.use("/api/admin/products",productRoutes)
app.use("/api/shop/products",shopProductsRoutes)
app.use("/api/shop/cart",shopCartRoutes)



app.listen(PORT, () => {
    console.log("server is running", PORT);
    connectDB()
})