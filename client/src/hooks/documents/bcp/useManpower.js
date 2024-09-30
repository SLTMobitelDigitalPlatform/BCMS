import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useManpower = () => {
  const [manpower, setManpower] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch manpower data by BCP ID and option
  const fetchManpower = async (bcpid, option) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpManpower/${bcpid}/${option}`
      );
      setManpower(response.data);
    } catch (err) {
      handleError("Error fetching manpower data.", err);
    } finally {
      setLoading(false);
    }
  };

  // Update manpower data
  const updateManpower = async (bcpid, option, tableData) => {
    try {
      await axiosInstance.put(`/api/bcpManpower/${bcpid}/${option}`, {
        tableData,
      });
    } catch (err) {
      handleError("Error updating manpower data.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    manpower,
    loading,
    fetchManpower,
    updateManpower,
  };
};
