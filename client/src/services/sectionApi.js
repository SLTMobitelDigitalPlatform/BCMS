import axiosInstance from "./axiosInstance";

// Get all users
export const getSections = async () => {
  const response = await axiosInstance.get("/api/sections");
  return response;
};
