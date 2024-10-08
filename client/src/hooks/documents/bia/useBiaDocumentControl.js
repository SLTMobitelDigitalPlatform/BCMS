import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useBiaDocumentControl = () => {
  const [BiaDocumentControls, setBiaDocumentControls] = useState([]);
  const [BiaDocumentControl, setBiaDocumentControl] = useState([]);
  const [loading, setLoading] = useState(false);

// Fetch Operating Sites by BIA ID
const fetchBiaDocumentControlByBIAID = async (biaid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/BiaDocumentControl/${biaid}`
      );
      setBiaDocumentControls(response.data);
    } catch (err) {
      handleError("Error fetching Operating Site.",err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single Operating Site by BIA ID and Mongo ID
  const fetchBiaDocumentControlByIds = async (biaid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/BiaDocumentControl/${biaid}/${id}`
      );
      setBiaDocumentControl(response.data);
    } catch (err) {
      handleError("Error fetching Operating Sites.",err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new Operating Site
  const addBiaDocumentControl = async (documentData) => {
    try {
      await axiosInstance.post("/api/BiaDocumentControl/add", documentData);
    } catch (err) {
      handleError("Error adding Operating Sites.",err);
    }
  };

  // Update an Operating Site
  const updateBiaDocumentControl = async (id, documentData) => {
    try {
      await axiosInstance.put(
        `/api/BiaDocumentControl/edit/${id}`,
        documentData
      );
    } catch (err) {
      handleError("Error updating Operating Sites.",err);
    }
  };

  // Delete an Operating Site
  const deleteBiaDocumentControl = async (id, biaid) => {
    try {
      await axiosInstance.delete(`/api/BiaDocumentControl/delete/${id}`);
      await fetchBiaDocumentControlByBIAID(biaid);
    } catch (err) {
      handleError("Error deleting Operating Sites.",err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    BiaDocumentControls,
    BiaDocumentControl,
    loading,
    fetchBiaDocumentControlByBIAID,
    fetchBiaDocumentControlByIds,
    addBiaDocumentControl,
    updateBiaDocumentControl,
    deleteBiaDocumentControl,
  };
};
