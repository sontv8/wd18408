import express from "express";
import productRouter from "./routers/product";
import { connectDB } from "./config/db";

const app = express();

app.use(express.json());

connectDB();

app.use("/api", productRouter);

export const viteNodeApp = app;
