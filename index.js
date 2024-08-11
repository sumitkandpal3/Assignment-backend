import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./config/database.js";

import adminRoutes from "./routes/adminRoutes.js";

import cartRoutes from "./routes/cartRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

// Middleware 
app.use(cors());
app.use(express.json()); // To parse JSON bodies

app.use('/api/auth',adminRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Start the Server
connect().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
