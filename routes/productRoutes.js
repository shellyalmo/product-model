import express from "express";
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import advancedResults from "../middleware/advancedResults.js";
import Product from "../models/Product.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;
