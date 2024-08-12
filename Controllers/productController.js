import { Category } from "../Models/categories.js";
import { Product } from "../Models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "dwlezv6pr",
  api_key: "852377643891357",
  api_secret: "gppmhtXVGd8h_r8lhJyFrbeLcQE",
});

// create product
export const createProduct = async (req, res) => {
  const { name, description, price, category, thumbnail, images, stock } =
    req.body;


  try {
    // Check if all required fields are present
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !thumbnail ||
      !images ||
      !stock
    ) {
      console.log(req.body);
      return res.status(400).json({
        success: false,
        message: "Input data is insufficient for creating the product",
      });
    }

    // Find or create the category
    let cat = await Category.findOne({ name: category }); // Use findOne instead of find to get a single category

    if (!cat) {
      cat = await Category.create({ name: category });
    }

    if (!cat._id) {
      return res.status(400).json({
        success: false,
        message: "Failed to create or find the category",
      });
    }

    // // Upload image to Cloudinary
    // const result = await cloudinary.uploader.upload(thumbnail, {
    //   folder: "thumbnail",
    // });

    // // Get the image URL from Cloudinary
    // const image = result.secure_url;
    // console.log("Image URL: " + image);

    // let newImages = [];
    // for (let image of images) {
    //   // Upload image to Cloudinary
    //   let r = await cloudinary.uploader.upload(image, {
    //     folder: "image",
    //   });

    //   // Get the image URL from Cloudinary
    //   let img = r.secure_url;
    //   newImages.push(img);
    // }

    // Create the product
    const product = new Product({
      name,
      description,
      price,
      category: cat._id, // Assign the category ID to the product
      thumbnail,
      images,
      stock,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product, // Return the created product in the response
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Failed to create the product",
    });
  }
};

// get all product
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    if (!products || products.length == 0) {
      return res
        .status(200)
        .json({ success: false, message: "no Product data found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product data fetched successfully",
      products,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to get the Product" });
  }
};

//get product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "product found successfully", product });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to get the product" });
  }
};

//update the product
export const updateProduct = async (req, res) => {
  let { name, description, price, category, thumbnail, images, stock } =
    req.body;
  try {
    if (
      !name &&
      !description &&
      !price &&
      !category &&
      !thumbnail &&
      !images &&
      !stock
    ) {
      return res.status(404).json({
        success: false,
        message: "input data is insufficient for updating the product",
      });
    }
    // Find or create the category
    if (category) {
      let cat = await Category.findOne({ name: category }); // Use findOne instead of find to get a single category

      if (!cat) {
        cat = await Category.create({ name: category });
      }

      if (!cat._id) {
        return res.status(400).json({
          success: false,
          message: "Failed to create or find the category",
        });
      }
      req.body.category = cat._id;
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update the product" });
  }
};

//delete the product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
      product: existingProduct,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete the product" });
  }
};
