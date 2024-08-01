import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controllers/product";
import { checkAuth } from "../middlewares/checkauth";
// import { getAllProduct } from "../controllers/product";

const router = express.Router();

router.get("/products", getAllProduct);
router.get("/products/:id", getProductById);
router.post("/products", checkAuth, createProduct);
router.put("/products/:id", checkAuth, updateProduct);
router.delete("/products/:id", checkAuth, deleteProduct);

export default router;
