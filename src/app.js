import express from "express";
import productRouter from "./routers/product";
import { connectDB } from "./config/db";
import authRouter from "./routers/auth";

const app = express();

app.use(express.json());

connectDB();

app.use("/api", productRouter);
app.use("/api", authRouter);

export const viteNodeApp = app;
