import axiosInstance from "./axiosInstance";

// Get all sections
export const getSections = async () => {
  const response = await axiosInstance.get("/api/sections");
  return response;
};

// Get a section by ID
export const getSection = async (id) => {
  const response = await axiosInstance.get(`/api/section/${id}`);
  return response;
};

// Create a new section
export const createSection = async (formData) => {
  const response = await axiosInstance.post("/api/section/create", formData);
  return response;
};

// Delete a section
export const deleteSection = async (id) => {
  const response = await axiosInstance.delete(`/api/section/delete/${id}`);
  return response;
};

// Update a section
export const updateSection = async (id, updatedData) => {
  const response = await axiosInstance.put(
    `/api/section/edit/${id}`,
    updatedData
  );
  return response;
};
