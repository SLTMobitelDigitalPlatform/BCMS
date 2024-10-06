import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useRecoveryAndResumptions = () => {
  const [recoveryResumptions, setRecoveryResumptions] = useState([]);
  const [recoveryResumption, setRecoveryResumption] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch recovery and resumptions by BCP ID
  const fetchRecoveryResumptionsByBCPID = async (bcpid, cbfid = null) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpRecoveryResumption/${bcpid}`,
        {
          params: {
            criticalBusinessFunction: cbfid ? cbfid : null,
          },
        }
      );
      setRecoveryResumptions(response.data);
    } catch (err) {
      handleError("Error fetching recovery and resumptions.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single recovery and resumption by BCP ID and Mongo ID
  const fetchRecoveryResumptionByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpRecoveryResumption/${bcpid}/${id}`
      );
      setRecoveryResumption(response.data);
    } catch (err) {
      handleError("Error fetching recovery and resumption.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new recovery and resumption
  const addRecoveryResumption = async (documentData) => {
    try {
      await axiosInstance.post("/api/bcpRecoveryResumption/add", documentData);
    } catch (err) {
      handleError("Error adding recovery and resumption.", err);
    }
  };

  // Update an recovery and resumption
  const updateRecoveryResumption = async (id, documentData) => {
    try {
      await axiosInstance.put(
        `/api/bcpRecoveryResumption/edit/${id}`,
        documentData
      );
    } catch (err) {
      handleError("Error updating recovery and resumption.", err);
    }
  };

  // Delete an recovery and resumption
  const deleteRecoveryResumption = async (id, bcpid) => {
    try {
      await axiosInstance.delete(`/api/bcpRecoveryResumption/delete/${id}`);
      await fetchRecoveryResumptionsByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting recovery and resumption.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    recoveryResumptions,
    recoveryResumption,
    loading,
    fetchRecoveryResumptionsByBCPID,
    fetchRecoveryResumptionByIds,
    addRecoveryResumption,
    updateRecoveryResumption,
    deleteRecoveryResumption,
  };
};
