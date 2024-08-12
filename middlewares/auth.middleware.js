import jwt from "jsonwebtoken";
import { User } from "../Models/userModel.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken?.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized request" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized request" });
  }
};

export const authoriseRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Permission denied for ${req.user.role}`,
      });
    }
    next();
  };
};
