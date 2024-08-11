import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../Controllers/productController.js";

const router = Router();

router.route("/all").get(verifyJWT, getAllProduct);
router.route("/create").post(verifyJWT, createProduct);
router.route("/:id").get( getProductById);
router.route("/update/:id").put(verifyJWT, updateProduct);
router.route("/delete/:id").delete(verifyJWT, deleteProduct);

export default router;
