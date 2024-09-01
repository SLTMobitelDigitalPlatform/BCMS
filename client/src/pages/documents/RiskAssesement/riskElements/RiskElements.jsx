import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  getItemsInCategory,
  createCategory,
  addItemToCategory,
  editCategoryName,
  editItemInCategory,
  deleteCategory,
  deleteItemFromCategory,
} from "../../../../services/riskElementsApi";

const RiskElements = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [editCategoryNameInput, setEditCategoryNameInput] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editItemNameInput, setEditItemNameInput] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      await createCategory(newCategoryName);
      setNewCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Failed to create category", error);
    }
  };

  const handleSelectCategory = async (categoryName) => {
    try {
      const response = await getItemsInCategory(categoryName);
      setSelectedCategory({ name: categoryName, items: response.data });
      //   console.log({ name: categoryName, items: response.data });
    } catch (error) {
      console.error("Failed to select category", error);
    }
  };

  const handleAddItem = async () => {
    try {
      await addItemToCategory(selectedCategory.name, newItemName);
      setNewItemName("");
      handleSelectCategory(selectedCategory.name);
    } catch (error) {
      console.error("Failed to add item", error);
    }
  };

  const handleEditCategory = async (categoryId) => {
    try {
      await editCategoryName(categoryId, editCategoryNameInput);
      setEditCategoryNameInput("");
      fetchCategories();
    } catch (error) {
      console.error("Failed to edit category", error);
    }
  };

  const handleEditItem = async (itemId) => {
    try {
      await editItemInCategory(
        selectedCategory.name,
        itemId,
        editItemNameInput
      );
      setEditItem(null);
      setEditItemNameInput("");
      handleSelectCategory(selectedCategory.name);
    } catch (error) {
      console.error("Failed to edit item", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setSelectedCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItemFromCategory(selectedCategory.name, itemId);
      handleSelectCategory(selectedCategory.name);
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  return (
    <div>
      <h1>Category Manager</h1>
      <div>
        <h2>Create New Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleCreateCategory}>Create</button>
      </div>
      <div>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id}>
              <div>
                <span
                  onClick={() => handleSelectCategory(category.categoryName)}
                >
                  {category.categoryName}
                </span>
                <button onClick={() => handleDeleteCategory(category._id)}>
                  Delete
                </button>
              </div>
              {editCategoryNameInput && (
                <div>
                  <input
                    type="text"
                    placeholder="New Category Name"
                    value={editCategoryNameInput}
                    onChange={(e) => setEditCategoryNameInput(e.target.value)}
                  />
                  <button onClick={() => handleEditCategory(category._id)}>
                    Save
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {selectedCategory && (
        <div>
          <h2>{selectedCategory.name} Items</h2>
          <ul>
            {selectedCategory.items.map((item) => (
              <li key={item._id}>
                {editItem === item._id ? (
                  <div>
                    <input
                      type="text"
                      value={editItemNameInput}
                      onChange={(e) => setEditItemNameInput(e.target.value)}
                    />
                    <button onClick={() => handleEditItem(item._id)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    {item.name}
                    <button onClick={() => setEditItem(item._id)}>Edit</button>
                    <button onClick={() => handleDeleteItem(item._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              placeholder="New Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <button onClick={handleAddItem}>Add Item</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskElements;
