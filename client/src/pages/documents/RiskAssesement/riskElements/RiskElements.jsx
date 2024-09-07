import { useEffect, useState } from "react";
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
import RiskAssNavigation from "../../../../components/RiskAssNavigation";

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
      const categoriesWithItems = await Promise.all(
        response.data.map(async (category) => {
          const itemsResponse = await getItemsInCategory(category.categoryName);
          return { ...category, items: itemsResponse.data };
        })
      );
      setCategories(categoriesWithItems);
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
      if (!selectedCategory || !selectedCategory.name) {
        console.error("No category selected or category name is missing");
        return;
      }

      await deleteItemFromCategory(selectedCategory.name, itemId);
      handleSelectCategory(selectedCategory.name);
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };
  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div>
        <h2>Create New Risk Element Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategoryName}
          className="border rounded px-2 py-1"
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button
          className="px-4 py-1 rounded-lg bg-blue-600 text-white font-semibold"
          onClick={handleCreateCategory}
        >
          Create
        </button>
      </div>
      {selectedCategory && (
        <div className="mt-5 overflow-auto">
          <h2>Add New Item to {selectedCategory.name}</h2>
          <input
            type="text"
            placeholder="New Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button
            className="ml-2 px-4 py-1 bg-blue-600 text-white rounded-lg"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
      )}

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <h2>Categories</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              {categories.map((category) => (
                <th
                  key={category._id}
                  className="border px-4 py-2 bg-gray-200 text-left"
                >
                  <div>
                    <span
                      className="cursor-pointer text-blue-600"
                      onClick={() =>
                        handleSelectCategory(category.categoryName)
                      }
                    >
                      {category.categoryName}
                    </span>
                    <button
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </div>
                  {editCategoryNameInput && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="New Category Name"
                        value={editCategoryNameInput}
                        onChange={(e) =>
                          setEditCategoryNameInput(e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      />
                      <button
                        className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                        onClick={() => handleEditCategory(category._id)}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {categories.map((category) => (
                <td key={category._id} className="border px-4 py-2">
                  <ul>
                    {category.items.map((item) => (
                      <li key={item._id} className="mt-2">
                        {editItem === item._id ? (
                          <div>
                            <input
                              type="text"
                              value={editItemNameInput}
                              onChange={(e) =>
                                setEditItemNameInput(e.target.value)
                              }
                              className="border rounded px-2 py-1"
                            />
                            <button
                              className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                              onClick={() => handleEditItem(item._id)}
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div>
                            {item.name}
                            <button
                              className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded"
                              onClick={() => setEditItem(item._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                              onClick={() => handleDeleteItem(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskElements;
