import { useState } from "react";
import axiosInstance from "../services/axiosInstance";

export const useUsers = () => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user
  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get("/currentuser");
      setUser(response.data);
    } catch (err) {
      handleError("Error fetching user data.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user details
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
    } catch (err) {
      handleError("Error fetching users data.", err);
    } finally {
      setLoading(false);
    }
  };

  const sortedUsers = users
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((user) => ({ value: user.name, label: user.name }));

  // Handle errors
  const handleError = (message, err) => {
    setError(message);
    console.error(message, err.response?.data || err);
  };

  return {
    user,
    users,
    sortedUsers,
    loading,
    error,
    fetchUserDetails,
    fetchUsers,
  };
};
