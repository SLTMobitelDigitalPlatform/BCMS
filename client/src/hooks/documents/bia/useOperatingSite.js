import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useOperatingSite = () => {
  const [operatingSites, setOperatingSites] = useState([]);
  const [operatingSite, setOperatingSite] = useState([]);
  const [loading, setLoading] = useState(false);

// Fetch Operating Sites by BIA ID
const fetchOperatingSitesByBIAID = async (biaid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaOperatingSite/${biaid}`
      );
      setOperatingSites(response.data);
    } catch (err) {
      handleError("Error fetching Operating Site.",err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single Operating Site by BIA ID and Mongo ID
  const fetchOperatingSiteByIds = async (biaid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaOperatingSite/${biaid}/${id}`
      );
      setOperatingSite(response.data);
    } catch (err) {
      handleError("Error fetching Operating Sites.",err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new Operating Site
  const addOperatingSite = async (documentData) => {
    try {
      await axiosInstance.post("/api/biaOperatingSite/add", documentData);
    } catch (err) {
      handleError("Error adding Operating Sites.",err);
    }
  };

  // Update an Operating Site
  const updateOperatingSite = async (id, documentData) => {
    try {
      await axiosInstance.put(
        `/api/biaOperatingSite/edit/${id}`,
        documentData
      );
    } catch (err) {
      handleError("Error updating Operating Sites.",err);
    }
  };

  // Delete an Operating Site
  const deleteOperatingSite = async (id, biaid) => {
    try {
      await axiosInstance.delete(`/api/biaOperatingSite/delete/${id}`);
      await fetchOperatingSitesByBIAID(biaid);
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
    operatingSites,
    operatingSite,
    loading,
    fetchOperatingSitesByBIAID,
    fetchOperatingSiteByIds,
    addOperatingSite,
    updateOperatingSite,
    deleteOperatingSite,
  };
};
