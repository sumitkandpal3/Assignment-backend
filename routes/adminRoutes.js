import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {  userLogin, userRegister } from "../Controllers/adminController.js";

const router = Router();
router.route("/login").post( userLogin);
router.route("/register").post( userRegister);

export default router;
