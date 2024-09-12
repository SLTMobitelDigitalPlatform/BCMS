import { useState } from "react";
import axiosInstance from "../services/axiosInstance";

export const useUsers = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get("/currentuser");
      setUser(response.data);
    } catch (err) {
      setError("Error fetching user details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchUserDetails, user, loading, error };
};
