import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useCriticalBusinessFunction = () => {
  const [criticalBusinessFunctions, setCriticalBusinessFunctions] = useState([]);
  const [criticalBusinessFunction, setCriticalBusinessFunction] = useState([]);
  const [loading, setLoading] = useState(false);

  //   Fetch critical business functions by BIA ID
  const fetchCriticalBusinessFunctionsByBIAID = async (biaid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaCriticalBusinessFunction/${biaid}`
      );
      setCriticalBusinessFunctions(response.data);
    } catch (err) {
      handleError("Error fetching critical business functions.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single critical business function by BIA ID and Mongo ID
  const fetchCriticalBusinessFunctionsByIds = async (biaid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaCriticalBusinessFunction/${biaid}/${id}`
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
        "/api/biaCriticalBusinessFunction/add",
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
        `/api/biaCriticalBusinessFunction/edit/${id}`,
        criticalBusinessFunctionData
      );
    } catch (err) {
      handleError("Error updating critical business function.", err);
    }
  };

  //   Delete a critical business function
  const deleteCriticalBusinessFunction = async (id, biaid) => {
    try {
      await axiosInstance.delete(
        `/api/biaCriticalBusinessFunction/delete/${id}`
      );
      await fetchCriticalBusinessFunctionsByBIAID(biaid);
    } catch (err) {
      handleError("Error deleting critical business function.", err);
    }
  };

  const sortedCBFunctions = criticalBusinessFunctions
  .slice()
  .sort((a, b) => a.functionName.localeCompare(b.functionName))
  .map((cbf) => ({ value: cbf._id, label: cbf.functionName }));

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    criticalBusinessFunctions,
    criticalBusinessFunction,
    sortedCBFunctions,
    loading,
    fetchCriticalBusinessFunctionsByBIAID,
    fetchCriticalBusinessFunctionsByIds,
    addCriticalBusinessFunction,
    updateCriticalBusinessFunction,
    deleteCriticalBusinessFunction,
  };
};
