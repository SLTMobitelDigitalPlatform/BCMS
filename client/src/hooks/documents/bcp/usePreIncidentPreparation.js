import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const usePreIncidentPreparation = () => {
  const [preIncidentPreparation, setPreIncidentPreparation] = useState([]);
  const [preIncidentPreparations, setPreIncidentPreparations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pre-incident preparation by BCP ID
  const fetchPreIncidentPreparationByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpPreIncidentPreparation/${bcpid}`
      );
      setPreIncidentPreparations(response.data);
    } catch (err) {
      handleError("Error fetching pre-incident preparations.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single pre-incident preparation by BCP ID and Mongo ID
  const fetchPreIncidentPreparationByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpPreIncidentPreparation/${bcpid}/${id}`
      );
      setPreIncidentPreparation(response.data);
    } catch (err) {
      handleError("Error fetching pre-incident preparation.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new pre-incident preparation
  const addPreIncidentPreparation = async (preIncidentPreparationData) => {
    try {
      await axiosInstance.post(
        "/api/bcpPreIncidentPreparation/add",
        preIncidentPreparationData
      );
    } catch (err) {
      handleError("Error adding pre-incident preparation.", err);
    }
  };

  // Update a pre-incident preparation
  const updatePreIncidentPreparation = async (
    id,
    preIncidentPreparationData
  ) => {
    try {
      await axiosInstance.put(
        `/api/bcpPreIncidentPreparation/edit/${id}`,
        preIncidentPreparationData
      );
    } catch (err) {
      handleError("Error updating pre-incident preparation.", err);
    }
  };

  // Delete a pre-incident preparation
  const deletePreIncidentPreparation = async (id, bcpid) => {
    try {
      await axiosInstance.delete(`/api/bcpPreIncidentPreparation/delete/${id}`);
      await fetchPreIncidentPreparationByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting pre-incident preparation.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    preIncidentPreparation,
    preIncidentPreparations,
    loading,
    // fetchPreIncidentPreparation,
    fetchPreIncidentPreparationByBCPID,
    fetchPreIncidentPreparationByIds,
    // fetchLastPreIncidentPreparation,
    addPreIncidentPreparation,
    updatePreIncidentPreparation,
    deletePreIncidentPreparation,
  };
};

// Fetch all pre-incident preparation
// const fetchPreIncidentPreparation = async () => {
//   setLoading(true);
//   try {
//     const response = await axiosInstance.get(
//       "/api/bcpPreIncidentPreparation"
//     );
//     setPreIncidentPreparations(response.data);
//   } catch (err) {
//     handleError("Error fetching pre-incident preparations.", err);
//   } finally {
//     setLoading(false);
//   }
// };

// Fetch the last pre-incident preparation
// const fetchLastPreIncidentPreparation = async () => {
//   setLoading(true);
//   try {
//     const response = await axiosInstance.get(
//       "/api/bcpPreIncidentPreparation/last"
//     );
//     return response.data;
//   } catch (err) {
//     handleError("Error fetching last pre-incident preparation.", err);
//   } finally {
//     setLoading(false);
//   }
// };
