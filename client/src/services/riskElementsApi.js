import axiosInstance from "./axiosInstance";

// Get all categories
export const getAllCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response;
};

// Get all items
export const getItemsInCategory = async (categoryName) => {
  const response = await axiosInstance.get(`/categories/${categoryName}`);
  return response;
};

// craete category
export const createCategory = async (categoryName) => {
  const response = await axiosInstance.post(`/categories/create`, {
    categoryName,
  });
  return response;
};

// craete item
export const addItemToCategory = async (categoryName, name) => {
  const response = await axiosInstance.post(`/categories/add/${categoryName}`, {
    name,
  });
  return response;
};

// Delete a category
export const deleteCategory = async (categoryId) => {
  const response = await axiosInstance.delete(
    `/categories/delete/${categoryId}`
  );
  return response;
};

// Delete a item
export const deleteItemFromCategory = async (categoryName, itemId) => {
  const response = await axiosInstance.delete(
    `/categories/${categoryName}/delete/items/${itemId}`
  );
  return response;
};

// Update a category
export const editCategoryName = async (categoryId, newCategoryName) => {
  const response = await axiosInstance.put(`/categories/edit/${categoryId}`, {
    categoryName: newCategoryName,
  });
  return response;
};

// Update a item
export const editItemInCategory = async (categoryName, itemId, name) => {
  const response = await axiosInstance.put(
    `/categories/${categoryName}/edit/items/${itemId}`,
    { name }
  );
  return response;
};
