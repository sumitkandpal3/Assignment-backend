import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../Controllers/categoryController.js";
const router = express.Router();

router.route("/categories").post(verifyJWT, createCategory);
router.route("/categories").get(verifyJWT, getAllCategory);
router.route("/categories/:id").put(verifyJWT, updateCategory);
router.route("/categories/:id").delete(verifyJWT, deleteCategory);

export default router;
