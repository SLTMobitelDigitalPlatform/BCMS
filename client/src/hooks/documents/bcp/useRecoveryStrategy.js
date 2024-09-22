import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useRecoveryStrategy = () => {
  const [recoveryStrategies, setRecoveryStrategies] = useState([]);
  const [recoveryStrategy, setRecoveryStrategy] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch recovery strategies by BCP ID
  const fetchRecoveryStrategiesByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpRecoveryStrategy/${bcpid}`
      );
      setRecoveryStrategies(response.data);
    } catch (err) {
      handleError("Error fetching recovery strategies.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single recovery strategy by BCP ID and Mongo ID
  const fetchRecoveryStrategyByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpRecoveryStrategy/${bcpid}/${id}`
      );
      setRecoveryStrategy(response.data);
    } catch (err) {
      handleError("Error fetching recovery strategy.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Add a new recovery strategy
  const addRecoveryStrategy = async (recoveryStrategyData) => {
    try {
      await axiosInstance.post(
        "/api/bcpRecoveryStrategy/add",
        recoveryStrategyData
      );
    } catch (err) {
      handleError("Error adding recovery strategy.", err);
    }
  };

  //   Update a recovery strategy
  const updateRecoveryStrategy = async (id, recoveryStrategyData) => {
    try {
      await axiosInstance.put(
        `/api/bcpRecoveryStrategy/edit/${id}`,
        recoveryStrategyData
      );
    } catch (err) {
      handleError("Error updating recovery strategy.", err);
    }
  };

  //   Delete a recovery strategy
  const deleteRecoveryStrategy = async (id, bcpid) => {
    try {
      await axiosInstance.delete(`/api/bcpRecoveryStrategy/delete/${id}`);
      await fetchRecoveryStrategiesByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting recovery strategy.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    recoveryStrategies,
    recoveryStrategy,
    loading,
    fetchRecoveryStrategiesByBCPID,
    fetchRecoveryStrategyByIds,
    addRecoveryStrategy,
    updateRecoveryStrategy,
    deleteRecoveryStrategy,
    handleError,
  };
};
