import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useWorkAreaRecovery = () => {
  const [workAreaRecoveries, setWorkAreaRecoveries] = useState([]);
  const [workAreaRecovery, setWorkAreaRecovery] = useState([]);
  const [loading, setLoading] = useState(false);

  //   Fetch work area recoveries by BCP ID
  const fetchWorkAreaRecoveriesByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpWorkAreaRecovery/${bcpid}`
      );
      setWorkAreaRecoveries(response.data);
    } catch (err) {
      handleError("Error fetching work area recoveries.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Fetch a single work area recovery by BCP ID and Mongo ID
  const fetchWorkAreaRecoveryByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpWorkAreaRecovery/${bcpid}/${id}`
      );
      setWorkAreaRecovery(response.data);
    } catch (err) {
      handleError("Error fetching work area recovery.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Add a new work area recovery
  const addWorkAreaRecovery = async (workAreaRecoveryData) => {
    try {
      await axiosInstance.post(
        "/api/bcpWorkAreaRecovery/add",
        workAreaRecoveryData
      );
    } catch (err) {
      handleError("Error adding work area recovery.", err);
    }
  };

  //   Update a work area recovery
  const updateWorkAreaRecovery = async (id, workAreaRecoveryData) => {
    try {
      await axiosInstance.put(
        `/api/bcpWorkAreaRecovery/edit/${id}`,
        workAreaRecoveryData
      );
    } catch (err) {
      handleError("Error updating work area recovery.", err);
    }
  };

  //   Delete a work area recovery
  const deleteWorkAreaRecovery = async (id, bcpid) => {
    try {
      await axiosInstance.delete(`/api/bcpWorkAreaRecovery/delete/${id}`);
      await fetchWorkAreaRecoveriesByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting work area recovery.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    workAreaRecoveries,
    workAreaRecovery,
    loading,
    fetchWorkAreaRecoveriesByBCPID,
    fetchWorkAreaRecoveryByIds,
    addWorkAreaRecovery,
    updateWorkAreaRecovery,
    deleteWorkAreaRecovery,
  };
};
