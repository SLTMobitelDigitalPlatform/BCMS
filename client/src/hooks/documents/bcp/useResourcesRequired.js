import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const useResourcesRequired = () => {
  const [resourcesRequired, setResourcesRequired] = useState([]);
  const [resourceRequired, setResourceRequired] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all resources required
  const fetchResourcesRequired = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/bcpResourcesRequired");
      setResourcesRequired(response.data);
    } catch (err) {
      handleError("Error fetching resources required.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the last resource required
  const fetchLastResourceRequired = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/api/bcpResourcesRequired/last"
      );
      return response.data;
    } catch (err) {
      handleError("Error fetching last resource required.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single resource required by ID
  const fetchResourceRequiredById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpResourcesRequired/${id}`
      );
      setResourceRequired(response.data);
    } catch (err) {
      handleError("Error fetching resource required.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new resource required
  const addResourceRequired = async (resourceRequiredData) => {
    setLoading(true);
    try {
      await axiosInstance.post(
        "/api/bcpResourcesRequired/add",
        resourceRequiredData
      );
      await fetchResourcesRequired(); // refresh the list after adding
    } catch (err) {
      handleError("Error adding resource required.", err);
    } finally {
      setLoading(false);
    }
  };

  // Update a resource required
  const updateResourceRequired = async (id, resourceRequiredData) => {
    setLoading(true);
    try {
      await axiosInstance.put(
        `/api/bcpResourcesRequired/edit/${id}`,
        resourceRequiredData
      );
      await fetchResourcesRequired(); // refresh the list after updating
    } catch (err) {
      handleError("Error updating resource required.", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a resource required
  const deleteResourceRequired = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/bcpResourcesRequired/delete/${id}`);
      await fetchResourcesRequired(); // refresh the list after deleting
    } catch (err) {
      handleError("Error deleting resource required.", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    setError(message);
    console.error(message, err.response?.data || err);
  };

  return {
    resourcesRequired,
    resourceRequired,
    loading,
    error,
    fetchResourcesRequired,
    fetchLastResourceRequired,
    fetchResourceRequiredById,
    addResourceRequired,
    updateResourceRequired,
    deleteResourceRequired,
  };
};
