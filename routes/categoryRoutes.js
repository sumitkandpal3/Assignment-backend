import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../Controllers/categoryController.js";
const router = express.Router();

router.route("/create").post(verifyJWT, createCategory);
router.route("/all").get(verifyJWT, getAllCategory);
router.route("/update/:id").put(verifyJWT, updateCategory);
router.route("/delete/:id").delete(verifyJWT, deleteCategory);

export default router;
