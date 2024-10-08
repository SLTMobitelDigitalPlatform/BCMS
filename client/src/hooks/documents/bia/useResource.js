import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useResource = () => {
  const [resources, setResources] = useState([]);
  const [resource, setResource] = useState([]);
  const [loading, setLoading] = useState(false);

// Fetch Operating Sites by BIA ID
const fetchResourcesByBIAID = async (biaid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaResource/${biaid}`
      );
      setResources(response.data);
    } catch (err) {
      handleError("Error fetching Operating Site.",err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single Operating Site by BIA ID and Mongo ID
  const fetchResourceByIds = async (biaid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaResource/${biaid}/${id}`
      );
      setResource(response.data);
    } catch (err) {
      handleError("Error fetching Operating Sites.",err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new Operating Site
  const addResource = async (documentData) => {
    try {
      await axiosInstance.post("/api/biaResource/add", documentData);
    } catch (err) {
      handleError("Error adding Operating Sites.",err);
    }
  };

  // Update an Operating Site
  const updateResource = async (id, documentData) => {
    try {
      await axiosInstance.put(
        `/api/biaResource/edit/${id}`,
        documentData
      );
    } catch (err) {
      handleError("Error updating Operating Sites.",err);
    }
  };

  // Delete an Operating Site
  const deleteResource = async (id, biaid) => {
    try {
      await axiosInstance.delete(`/api/biaResource/delete/${id}`);
      await fetchResourcesByBIAID(biaid);
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
    resources,
    resource,
    loading,
    fetchResourcesByBIAID,
    fetchResourceByIds,
    addResource,
    updateResource,
    deleteResource,
  };
};
