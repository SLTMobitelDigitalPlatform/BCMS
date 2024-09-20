import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const useResourcesRequired = () => {
  const [resourcesRequired, setResourcesRequired] = useState([]);
  const [resourceRequired, setResourceRequired] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all resources required
  // const fetchResourcesRequired = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/api/bcpResourcesRequired");
  //     setResourcesRequired(response.data);
  //   } catch (err) {
  //     handleError("Error fetching resources required.", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch resources required by BCP ID
  const fetchResourcesRequiredByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpResourcesRequired/${bcpid}`
      );
      setResourcesRequired(response.data);
    } catch (err) {
      handleError("Error fetching resources required.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the last resource required
  // const fetchLastResourceRequired = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get(
  //       "/api/bcpResourcesRequired/last"
  //     );
  //     return response.data;
  //   } catch (err) {
  //     handleError("Error fetching last resource required.", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch a single resource required by BCP ID and Mongo ID
  const fetchResourceRequiredByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpResourcesRequired/${bcpid}/${id}`
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
    } catch (err) {
      handleError("Error updating resource required.", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a resource required
  const deleteResourceRequired = async (id, bcpid) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/bcpResourcesRequired/delete/${id}`);
      await fetchResourcesRequiredByBCPID(bcpid);
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
    // fetchResourcesRequired,
    fetchResourcesRequiredByBCPID,
    fetchResourceRequiredByIds,
    // fetchLastResourceRequired,
    addResourceRequired,
    updateResourceRequired,
    deleteResourceRequired,
  };
};
