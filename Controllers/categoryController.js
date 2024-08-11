import { Category} from "../Models/categories.js";

// create a new category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(404).json({
        success: false,
        message: "Input data is insufficient for creating the category",
      });
    }
    const category = new category({ name });
    await category.save();
    return res
      .status(201)
      .json(
        { success: true, message: "New category successfully created" },
        category
      );
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create the category" });
  }
};

//get all categories
export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res
        .status(404)
        .json({ success: false, message: "No categories found" });
    }
    return res
      .status(200)
      .json(
        { success: true, message: "Categories fetched successfully" },
        categories
      );
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to get the categories" });
  }
};

// update category
export const updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "input data is insufficient for updating the category",
      });
    }
    return res
      .status(200)
      .json(
        { success: true, message: "Category Updated Successfully" },
        category
      );
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update the category" });
  }
};

// delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    await Category.findByIdAndDelete(id);
    return res
      .status(200)
      .json({
        success: true,
        message: "Category deleted successfully",
        category: existingCategory,
      });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete the data" });
  }
};
