import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useBIAForm = () => {
  const [businessImpactAnalysisPlans, setBusinessImpactAnalysisPlans] = useState([]);
  const [businessImpactAnalysisPlan, setBusinessImpactAnalysisPlan] = useState([]);
  const [lastBusinessImpactAnalysisPlan, setLastBusinessImpactAnalysisPlan] = useState(
    []
  );
  const [loading, setLoading] = useState(false);

  // Fetch all BIA forms
  const fetchBIAForms = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/biaForms");
      setBusinessImpactAnalysisPlans(response.data);
    } catch (err) {
      handleError("Error fetching BIA forms.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the last BIA form
  const fetchLastBIAForm = async (section) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaForms/last/${section}`
      );
      setLastBusinessImpactAnalysisPlan(response.data);
    } catch (err) {
      handleError("Error fetching last BIA form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch BIA form by BIA ID
  const fetchBIAFormByBIAID = async (biaid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/biaForms/${biaid}`);
      setBusinessImpactAnalysisPlan(response.data);
    } catch (err) {
      handleError("Error fetching BIA form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single BIA form by ID
  const fetchBIAFormById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/biaForms/${id}`);
      setBusinessImpactAnalysisPlan(response.data);
    } catch (err) {
      handleError("Error fetching BIA form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new BIA Form
  const addBIAForm = async (documentData) => {
    try {
      await axiosInstance.post("/api/biaForms/add", documentData);
      await fetchBIAForms();
    } catch (err) {
      handleError("Error adding BIA Form.", err);
    }
  };

  // Update BIA by BIA ID
  const updateBIAFormByBIAID = async (biaid, documentData) => {
    try {
      await axiosInstance.put(`/api/biaForms/edit/${biaid}`, documentData);
      await fetchBIAForms();
    } catch (err) {
      handleError("Error updating BIA Form.", err);
    }
  };

  // Update a BIA Form
  const updateBIAForm = async (id, documentData) => {
    try {
      await axiosInstance.put(`/api/biaForms/edit/${id}`, documentData);
      await fetchBIAForms();
    } catch (err) {
      handleError("Error updating BIA Form.", err);
    }
  };

  // Delete a BIA Form
  const deleteBIAForm = async (id) => {
    try {
      await axiosInstance.delete(`/api/biaForms/delete/${id}`);
      await fetchBIAForms();
    } catch (err) {
      handleError("Error deleting BIA Form.", err);
    }
  };

  // Check for duplicate BIA IDs
  const checkDuplicateBIAID = async (biaid, originalBIAID = null) => {
    try {
      const existingBIAIDs = businessImpactAnalysisPlans.map((bia) => bia.biaid);
      if (originalBIAID && biaid === originalBIAID) {
        return false;
      }
      return existingBIAIDs.includes(biaid);
    } catch (error) {
      console.error("Error checking BIA IDs: ", error);
      return false;
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    businessImpactAnalysisPlans,
    businessImpactAnalysisPlan,
    lastBusinessImpactAnalysisPlan,
    loading,
    fetchBIAForms,
    fetchLastBIAForm,
    fetchBIAFormByBIAID,
    fetchBIAFormById,
    addBIAForm,
    updateBIAFormByBIAID,
    updateBIAForm,
    deleteBIAForm,
    checkDuplicateBIAID,
    handleError,
  };
};
