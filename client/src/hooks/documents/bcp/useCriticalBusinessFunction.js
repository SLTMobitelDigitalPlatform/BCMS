import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useCriticalBusinessFunction = () => {
  const [criticalBusinessFunctions, setCriticalBusinessFunctions] = useState(
    []
  );
  const [criticalBusinessFunction, setCriticalBusinessFunction] = useState([]);
  const [loading, setLoading] = useState(false);

  //   Fetch critical business functions by BCP ID
  const fetchCriticalBusinessFunctionsByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpCriticalBusinessFunction/${bcpid}`
      );
      setCriticalBusinessFunctions(response.data);
    } catch (err) {
      handleError("Error fetching critical business functions.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single critical business function by BCP ID and Mongo ID
  const fetchCriticalBusinessFunctionsByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpCriticalBusinessFunction/${bcpid}/${id}`
      );
      setCriticalBusinessFunction(response.data);
    } catch (err) {
      handleError("Error fetching critical business function.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new critical business function
  const addCriticalBusinessFunction = async (criticalBusinessFunctionData) => {
    try {
      await axiosInstance.post(
        "/api/bcpCriticalBusinessFunction/add",
        criticalBusinessFunctionData
      );
    } catch (err) {
      handleError("Error adding critical business function.", err);
    }
  };

  //   Update a critical business function
  const updateCriticalBusinessFunction = async (
    id,
    criticalBusinessFunctionData
  ) => {
    try {
      await axiosInstance.put(
        `/api/bcpCriticalBusinessFunction/edit/${id}`,
        criticalBusinessFunctionData
      );
    } catch (err) {
      handleError("Error updating critical business function.", err);
    }
  };

  //   Delete a critical business function
  const deleteCriticalBusinessFunction = async (id, bcpid) => {
    try {
      await axiosInstance.delete(
        `/api/bcpCriticalBusinessFunction/delete/${id}`
      );
      await fetchCriticalBusinessFunctionsByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting critical business function.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    criticalBusinessFunctions,
    criticalBusinessFunction,
    loading,
    fetchCriticalBusinessFunctionsByBCPID,
    fetchCriticalBusinessFunctionsByIds,
    addCriticalBusinessFunction,
    updateCriticalBusinessFunction,
    deleteCriticalBusinessFunction,
  };
};
