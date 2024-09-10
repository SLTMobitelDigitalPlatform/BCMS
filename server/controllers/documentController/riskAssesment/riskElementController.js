const Category = require("../../../models/documentModels/riskElements/elements");

const getElements = async (req, res) => {
  try {
    const category = await Category.findOne({
      // get items under a Category
      categoryName: req.params.categoryName,
    });
    res.status(200).json(category.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addItemToCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      // get items under a Category
      categoryName: req.params.categoryName,
    });
    category.items.push({ name: req.body.name });
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editItemInCategory = async (req, res) => {
  try {
    const { categoryName, itemId } = req.params;
    const { name } = req.body;

    const category = await Category.findOneAndUpdate(
      { categoryName, "items._id": itemId },
      { $set: { "items.$.name": name } }, // Use `$set` to update the specific item's name
      { new: true } // Return the updated document
    );

    if (!category) {
      return res.status(404).json({ message: "Category or item not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteItemInCategory = async (req, res) => {
  try {
    const { categoryName, itemId } = req.params;

    // Find the category and remove the item from the items array
    const category = await Category.findOneAndUpdate(
      { categoryName }, // Find the category by name
      { $pull: { items: { _id: itemId } } }, // Remove the item with the specified ID from the items array
      { new: true } // Return the updated document
    );

    if (!category) {
      return res.status(404).json({ message: "Category or item not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      categoryName: req.body.categoryName,
      //items: req.body.items || []  //Initial items can be passed in the request body
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editCategoryName = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { categoryName: req.body.categoryName },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(
      req.params.categoryId
    );
    res.status(200).json({ message: "Category deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getElements,
  addItemToCategory,
  editItemInCategory,
  deleteItemInCategory,
  getAllCategories,
  createCategory,
  editCategoryName,
  deleteCategory,
};
