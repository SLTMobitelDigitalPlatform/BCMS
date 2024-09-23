import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const useBIAForm = () => {
  const [businessImpactAnalysisPlans, setbusinessImpactAnalysisPlans] = useState([]);
  const [businessImpactAnalysisPlan, setbusinessImpactAnalysisPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all BIA forms
  const fetchBIAForms = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/biaForms/");
      setbusinessImpactAnalysisPlans(response.data);
    } catch (err) {
      handleError("Error fetching BIA forms.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the last BIA form
  const fetchLastBIAForm = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/biaForms/last");
      return response.data;
    } catch (err) {
      handleError("Error fetching last BIA form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single BIA form by ID
  const fetchBIAFormById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/biaForms/${id}`);
      setbusinessImpactAnalysisPlan(response.data);
    } catch (err) {
      handleError("Error fetching BIA form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new BIA Form
  const addBIAForm = async (documentData) => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/biaForms/add", documentData);
      await fetchBIAForms(); // refresh the list after adding
    } catch (err) {
      handleError("Error adding BIA Form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Update a BIA Form
  const updateBIAForm = async (id, documentData) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/api/biaForms/edit/${id}`, documentData);
      await fetchBIAForms(); // refresh the list after updating
    } catch (err) {
      handleError("Error updating BIA Form.", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a BIA Form
  const deleteBIAForm = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/biaForms/delete/${id}`);
      await fetchBIAForms(); // refresh the list after deleting
    } catch (err) {
      handleError("Error deleting BIA Form.", err);
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
    businessImpactAnalysisPlans,
    businessImpactAnalysisPlan,
    loading,
    error,
    fetchBIAForms,
    fetchLastBIAForm,
    fetchBIAFormById,
    addBIAForm,
    updateBIAForm,
    deleteBIAForm,
    handleError,
  };
};
