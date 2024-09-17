import { useState } from "react";
import axiosInstance from "../services/axiosInstance";

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get("/getRole");
      setRoles(response.data);
    } catch (err) {
      handleError("Error fetching roles data.", err);
    }
    setLoading(false);
  };

  // Create role
  const createRole = async (roleData) => {
    try {
      await axiosInstance.post("/createRole", roleData);
      await fetchRoles();
    } catch (err) {
      handleError("Error creating role", err);
    }
  };

  //  Edit role
  const editRole = async (roleData) => {
    try {
      await axiosInstance.put("/updateRole", roleData);
      await fetchRoles();
    } catch (err) {
      handleError("Error updating role", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    setError(message);
    console.error(message, err.response?.data || err);
  };

  return { roles, loading, error, fetchRoles, createRole, editRole };
};
