import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const useBCPForm = () => {
  const [businessContinuityPlans, setBusinessContinuityPlans] = useState([]);
  const [businessContinuityPlan, setBusinessContinuityPlan] = useState([]);
  const [lastBusinessContinuityPlan, setLastBusinessContinuityPlan] = useState(
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setLoading(true);
    try {
      await axiosInstance.post("/api/bcpBCPForm/add", documentData);
      await fetchBCPForms(); // refresh the list after adding
    } catch (err) {
      handleError("Error adding BCP Form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Update BCP by BCP ID
  const updateBCPFormByBCPID = async (bcpid, documentData) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/api/bcpBCPForm/edit/${bcpid}`, documentData);
      await fetchBCPForms(); // refresh the list after updating
    } catch (err) {
      handleError("Error updating BCP Form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Update a BCP Form
  const updateBCPForm = async (id, documentData) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/api/bcpBCPForm/edit/${id}`, documentData);
      await fetchBCPForms(); // refresh the list after updating
    } catch (err) {
      handleError("Error updating BCP Form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a BCP Form
  const deleteBCPForm = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/bcpBCPForm/delete/${id}`);
      await fetchBCPForms(); // refresh the list after deleting
    } catch (err) {
      handleError("Error deleting BCP Form.", err);
    } finally {
      setLoading(false);
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
    setError(message);
    console.error(message, err.response?.data || err);
  };

  return {
    businessContinuityPlans,
    businessContinuityPlan,
    lastBusinessContinuityPlan,
    loading,
    error,
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
