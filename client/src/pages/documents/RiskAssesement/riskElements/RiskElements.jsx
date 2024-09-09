import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  addItemToCategory,
  createCategory,
  deleteCategory,
  deleteItemFromCategory,
  editCategoryName,
  editItemInCategory,
  getAllCategories,
  getItemsInCategory,
} from "../../../../services/riskElementsApi"; // Example API calls

Modal.setAppElement("#root");

const RiskElements = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryModal, setCategoryModal] = useState({
    isShown: false,
    type: "add",
    data: {},
  });
  const [itemModal, setItemModal] = useState({
    isShown: false,
    type: "add",
    data: {},
  });
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    // try {
    //   const response = await getAllCategories();
    //   const categoriesWithItems = await Promise.all(
    //     response.data.map(async (category) => {
    //       const itemsResponse = await getItemsInCategory(category.categoryName);
    //       return { ...category, items: itemsResponse.data };
    //     })
    //   );
    //   // if (categoriesWithItems.length > 0) {
    //   //   setSelectedCategory(categoriesWithItems[0]._id);
    //   // }
    //   setCategories(categoriesWithItems);
    //   setSelectedCategory(categoriesWithItems[0]?._id);
    try {
      const response = await getAllCategories();
      if (response.data && response.data.length > 0) {
        const categoriesWithItems = await Promise.all(
          response.data.map(async (category) => {
            if (category.categoryName) {
              try {
                const itemsResponse = await getItemsInCategory(
                  category.categoryName
                );
                return { ...category, items: itemsResponse.data };
              } catch (error) {
                console.error("Failed to fetch items for category", error);
                return { ...category, items: [] };
              }
            } else {
              return category;
            }
          })
        );
        setCategories(categoriesWithItems);
        setSelectedCategory(categoriesWithItems[0]?._id);
      } else {
        setCategories([]);
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleAddEditCategory = async (categoryData) => {
    if (!categoryData.categoryName.trim()) {
      setError("Category name is required.");
      setHasError(true);
      return;
    }
    setError("");
    setHasError(false);

    if (categoryModal.type === "add") {
      try {
        const response = await createCategory(categoryData.categoryName);

        if (response.data) {
          fetchCategories();
          setCategoryModal({ isShown: false, type: "add", data: {} });
        }
      } catch (error) {
        console.error("Error creating category", error.response?.data || error);
      }
    } else {
      try {
        const response = await editCategoryName(
          categoryData._id,
          categoryData.categoryName
        );

        if (response.data) {
          fetchCategories();
          setCategoryModal({ isShown: false, type: "add", data: {} });
        }
      } catch (error) {
        console.error("Error updating category", error.response?.data || error);
        setError(
          error.response?.data?.message || "Failed to perform the action"
        );
        setHasError(true);
      }
    }
  };

  const handleAddEditItem = async (itemData) => {
    if (!itemData.name) {
      setError("Item name is required.");
      setHasError(true);
      return;
    }
    setError("");
    setHasError(false);

    const categoryName = itemModal.data.categoryName;
    if (itemModal.type === "add") {
      try {
        const response = await addItemToCategory(categoryName, itemData.name);

        if (response.data) {
          fetchCategories();
          setItemModal({ isShown: false, type: "add", data: {} });
        }
      } catch (error) {
        console.error("Error creating category", error.response?.data || error);
      }
    } else {
      try {
        const response = await editItemInCategory(
          categoryName,
          itemData._id,
          itemData.name
        );

        if (response.data) {
          fetchCategories();
          setItemModal({ isShown: false, type: "add", data: {} });
        }
      } catch (error) {
        console.error("Error updating category", error.response?.data || error);
      }
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const handleDeleteItem = async (categoryName, itemId) => {
    try {
      await deleteItemFromCategory(categoryName, itemId);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  return (
    <div className="px-5 py-4  w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-indigo-900">
          Manage Risk Element Categories
        </h1>

        <button
          className="btn-primary font-semibold"
          onClick={() =>
            setCategoryModal({ isShown: true, type: "add", data: {} })
          }
        >
          Add New Category
        </button>
      </div>

      {/* Tabs for categories */}
      <div className="flex border-b mb-3">
        {categories.map((category) => (
          <button
            key={category._id}
            className={`py-2 px-4 ${
              selectedCategory === category._id
                ? "border-b-4 border-indigo-600"
                : ""
            }`}
            onClick={() => setSelectedCategory(category._id)}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto border-2 border-indigo-600 mb-2">
        {/* Items in selected category */}
        {selectedCategory &&
          categories
            .find((cat) => cat._id === selectedCategory)
            ?.items.map((item, index) => (
              <div
                key={item._id}
                className={`flex justify-between items-center py-2 px-4 ${
                  index !== 0 ? "border-t-2 border-indigo-600" : ""
                }`}
              >
                <span>{item.name}</span>
                <div>
                  <button
                    className="doc-edit-btn"
                    onClick={() =>
                      setItemModal({
                        isShown: true,
                        type: "edit",
                        data: {
                          ...item,
                          categoryName: categories.find(
                            (cat) => cat._id === selectedCategory
                          ).categoryName,
                        },
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="doc-delete-btn ml-2"
                    onClick={() =>
                      handleDeleteItem(
                        categories.find((cat) => cat._id === selectedCategory)
                          .categoryName,
                        item._id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>

      <div className="">
        <button
          className="mt-4 bg-green-500 text-white rounded px-4 py-2"
          onClick={() =>
            setItemModal({
              isShown: true,
              type: "add",
              data: {
                categoryName: categories.find(
                  (cat) => cat._id === selectedCategory
                ).categoryName,
              },
            })
          }
        >
          Add Item
        </button>
        <button
          className="ml-2 px-4 py-2 bg-sky-600 text-white rounded"
          onClick={() =>
            setCategoryModal({
              isShown: true,
              type: "edit",
              data: categories.find((cat) => cat._id === selectedCategory),
            })
          }
        >
          Edit Category :{" "}
          {selectedCategory &&
            categories.find((cat) => cat._id === selectedCategory).categoryName}
        </button>

        <button
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => handleDeleteCategory(selectedCategory)}
        >
          Delete Category :{" "}
          {selectedCategory &&
            categories.find((cat) => cat._id === selectedCategory).categoryName}
        </button>
      </div>

      {/* Add/Edit Category Modal */}
      <Modal
        isOpen={categoryModal.isShown}
        onRequestClose={() =>
          setCategoryModal({ isShown: false, type: "add", data: {} })
        }
        contentLabel="Add/Edit Category"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-5 rounded-lg">
          <h2>
            {categoryModal.type === "add"
              ? "Add New Category"
              : "Edit Category"}
          </h2>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryModal.data?.categoryName || ""}
            onChange={(e) =>
              setCategoryModal((prevState) => ({
                ...prevState,
                data: { ...prevState.data, categoryName: e.target.value },
              }))
            }
            className={`border p-2 mt-2 ${
              hasError && !categoryModal.data?.categoryName
                ? "border-red-500"
                : ""
            }`}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
            onClick={() => handleAddEditCategory(categoryModal.data)}
          >
            Save
          </button>
          <button
            className="mt-4 bg-red-500 text-white rounded px-4 py-2"
            onClick={() =>
              setCategoryModal({ isShown: false, type: "add", data: {} })
            }
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Add/Edit Item Modal */}
      <Modal
        isOpen={itemModal.isShown}
        onRequestClose={() =>
          setItemModal({ isShown: false, type: "add", data: {} })
        }
        contentLabel="Add/Edit Item"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-5 rounded-lg">
          <h2>{itemModal.type === "add" ? "Add New Item" : "Edit Item"}</h2>
          <input
            type="text"
            placeholder="Item Name"
            value={itemModal.data?.name || ""}
            onChange={(e) =>
              setItemModal((prevState) => ({
                ...prevState,
                data: { ...prevState.data, name: e.target.value },
              }))
            }
            className={`border p-2 mt-2 ${
              hasError && !itemModal.data?.name ? "border-red-500" : ""
            }`}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
            onClick={() => handleAddEditItem(itemModal.data)}
          >
            Save
          </button>
          <button
            className="mt-4 bg-red-500 text-white rounded px-4 py-2"
            onClick={() =>
              setItemModal({ isShown: false, type: "add", data: {} })
            }
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RiskElements;
