import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";
import uploadRouter from "./routes/upload";
import userRouter from "./routes/auth";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import orderDeatailRouter from "./routes/orderDetail";
import routerCustomer from "./routes/customer";
import mongoose from "mongoose";
import routerUser from "./routes/user";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/DATT2");
// middleware
app.use("/api/categories", categoryRouter)
app.use("/api/products", productRouter)
app.use("/api/images", uploadRouter);
app.use("/api", userRouter);
app.use("/api/customers", routerCustomer);
app.use("/api/users", routerUser);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/orderDetails", orderDeatailRouter);
export const viteNodeApp = app;
