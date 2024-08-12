import mongoose from "mongoose";
import { Cart } from "../Models/cartModel.js";
import { Product } from "../Models/productModel.js";

//Get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart) {
      return res
        .status(200)
        .json({ items: [], totalQuantity: 0, totalPrice: 0 });
    }
    return res
      .status(200)
      .json({ success: true, message: "cart fetched successfully" , cart});
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch the data" });
  }
};

//Add items to the cart
export const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    const product = await Product.findById(productId);

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }
    cart.totalQuantity += quantity;
    cart.totalPrice += product.price * quantity;
    await cart.save();
    return res
      .status(201)
      .json({ success: true, message: "Cart created Successfully", cart});
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add the data" });
  }
};

//remove item from cart
export const removeItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res
        .status(400)
        .json({ success: false, message: "Cart not found" });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === (req.params.ItemId)
    );

    if (itemIndex === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found in cart" });
    }
    const product = await Product.findById(cart.items[itemIndex].product);
    cart.totalQuantity -= cart.items[itemIndex].quantity;
    cart.totalPrice -= cart.items[itemIndex].quantity * product.price;

    cart.items.splice(itemIndex, 1);

    await cart.save();
    return res
      .status(200)
      .json({ success: true, message: "Item removed successfully", cart});
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Failed to remove item from the cart" });
  }
};

//update cart
export const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) {
      return res
        .status(400)
        .json({ success: false, message: "Cart not found" });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === (req.params.ItemId)
    );

    if (itemIndex === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found in cart" });
    }
    const oldPrice=cart.totalPrice;
    cart.items[itemIndex].quantity=req.body.newQuantity;
    const product = await Product.findById(cart.items[itemIndex].product);
   
    cart.totalPrice += (cart.items[itemIndex].quantity * product.price)-oldPrice;

    await cart.save();
    return res
      .status(200)
      .json({ success: true, message: "Item updated successfully", cart});
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update item from the cart" });
  }
};

//clear cart
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    return res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Failed to clear the cart" });
  }
};
