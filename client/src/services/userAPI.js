import axiosInstance from "./axiosInstance";

// Register a new user
export const registerUser = async (formData) => {
  const response = await axiosInstance.post("/user/register", formData);
  return response;
};

// Get all users
export const getUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response;
};

// Get current user
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/currentuser");
  return response;
};

// Delete a user
export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/user/delete/${id}`);
  return response;
};

// Update a user
export const updateUser = async (id, updatedData) => {
  const response = await axiosInstance.put(`/user/update/${id}`, updatedData);
  return response;
};
