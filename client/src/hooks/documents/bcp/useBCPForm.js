import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useBCPForm = () => {
  const [businessContinuityPlans, setBusinessContinuityPlans] = useState([]);
  const [businessContinuityPlan, setBusinessContinuityPlan] = useState([]);
  const [lastBusinessContinuityPlan, setLastBusinessContinuityPlan] = useState(
    []
  );
  const [loading, setLoading] = useState(false);

  // Fetch all BCP forms
  const fetchBCPForms = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/bcpBCPForm");
      setBusinessContinuityPlans(response.data);
    } catch (err) {
      handleError("Error fetching BCP forms.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the last BCP form
  const fetchLastBCPForm = async (section) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpBCPForm/last/${section}`
      );
      setLastBusinessContinuityPlan(response.data);
    } catch (err) {
      handleError("Error fetching last BCP form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch BCP form by BCP ID
  const fetchBCPFormByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/bcpBCPForm/${bcpid}`);
      setBusinessContinuityPlan(response.data);
    } catch (err) {
      handleError("Error fetching BCP form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single BCP form by ID
  const fetchBCPFormById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/bcpBCPForm/${id}`);
      setBusinessContinuityPlan(response.data);
    } catch (err) {
      handleError("Error fetching BCP form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new BCP Form
  const addBCPForm = async (documentData) => {
    try {
      await axiosInstance.post("/api/bcpBCPForm/add", documentData);
      await fetchBCPForms();
    } catch (err) {
      handleError("Error adding BCP Form.", err);
    }
  };

  // Update BCP by BCP ID
  const updateBCPFormByBCPID = async (bcpid, documentData) => {
    try {
      await axiosInstance.put(`/api/bcpBCPForm/edit/${bcpid}`, documentData);
      await fetchBCPForms();
    } catch (err) {
      handleError("Error updating BCP Form.", err);
    }
  };

  // Update a BCP Form
  const updateBCPForm = async (id, documentData) => {
    try {
      await axiosInstance.put(`/api/bcpBCPForm/edit/${id}`, documentData);
      await fetchBCPForms();
    } catch (err) {
      handleError("Error updating BCP Form.", err);
    }
  };

  // Delete a BCP Form
  const deleteBCPForm = async (id) => {
    try {
      await axiosInstance.delete(`/api/bcpBCPForm/delete/${id}`);
      await fetchBCPForms();
    } catch (err) {
      handleError("Error deleting BCP Form.", err);
    }
  };

  // Check for duplicate BCP IDs
  const checkDuplicateBCPID = async (bcpid, originalBCPID = null) => {
    try {
      const existingBCPIDs = businessContinuityPlans.map((bcp) => bcp.bcpid);
      if (originalBCPID && bcpid === originalBCPID) {
        return false;
      }
      return existingBCPIDs.includes(bcpid);
    } catch (error) {
      console.error("Error checking BCP IDs: ", error);
      return false;
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    businessContinuityPlans,
    businessContinuityPlan,
    lastBusinessContinuityPlan,
    loading,
    fetchBCPForms,
    fetchLastBCPForm,
    fetchBCPFormByBCPID,
    fetchBCPFormById,
    addBCPForm,
    updateBCPFormByBCPID,
    updateBCPForm,
    deleteBCPForm,
    checkDuplicateBCPID,
    handleError,
  };
};
