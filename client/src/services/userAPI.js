import axiosInstance from "./axiosInstance";

// Register a new user
export const registerUser = async (formData) => {
  const response = await axiosInstance.post("/user/register", formData);
  return response;
};

// Fetch all users
export const fetchUsers = async () => {
  const response = await axiosInstance.get("/users");
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
