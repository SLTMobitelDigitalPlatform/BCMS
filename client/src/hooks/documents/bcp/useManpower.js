import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useManpower = () => {
  const [manpower, setManpower] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch manpower data by BCP ID and option
  const fetchManpower = async (bcpid, option) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `api/bcpManpower/${bcpid}/${option}`
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
    setLoading(true);
    try {
      await axiosInstance.put(`api/bcpManpower/${bcpid}/${option}`, {
        tableData,
      });
    } catch (err) {
      handleError("Error updating manpower data.", err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    setError(message);
    errorAlert("Error", err.response?.data || message);
  };

  return {
    manpower,
    loading,
    error,
    fetchManpower,
    updateManpower,
  };
};
