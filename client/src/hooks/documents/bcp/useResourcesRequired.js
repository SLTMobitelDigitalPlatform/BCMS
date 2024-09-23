import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useResourcesRequired = () => {
  const [resourcesRequired, setResourcesRequired] = useState([]);
  const [resourceRequired, setResourceRequired] = useState([]);
  const [loading, setLoading] = useState(false);

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
    try {
      await axiosInstance.post(
        "/api/bcpResourcesRequired/add",
        resourceRequiredData
      );
    } catch (err) {
      handleError("Error adding resource required.", err);
    }
  };

  // Update a resource required
  const updateResourceRequired = async (id, resourceRequiredData) => {
    try {
      await axiosInstance.put(
        `/api/bcpResourcesRequired/edit/${id}`,
        resourceRequiredData
      );
    } catch (err) {
      handleError("Error updating resource required.", err);
    }
  };

  // Delete a resource required
  const deleteResourceRequired = async (id, bcpid) => {
    try {
      await axiosInstance.delete(`/api/bcpResourcesRequired/delete/${id}`);
      await fetchResourcesRequiredByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting resource required.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    resourcesRequired,
    resourceRequired,
    loading,
    // fetchResourcesRequired,
    fetchResourcesRequiredByBCPID,
    fetchResourceRequiredByIds,
    // fetchLastResourceRequired,
    addResourceRequired,
    updateResourceRequired,
    deleteResourceRequired,
  };
};

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
