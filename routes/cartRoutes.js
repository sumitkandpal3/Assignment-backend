import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addItemToCart,
  clearCart,
  getCart,
  removeItemFromCart,
} from "../Controllers/cartController.js";

const router = Router();

router.route("/all").get(verifyJWT, getCart);
router.route("/add").post(verifyJWT, addItemToCart);
router.route("/remove/:ItemId").delete(verifyJWT, removeItemFromCart);
router.route("/clear").delete(verifyJWT, clearCart);

export default router;
