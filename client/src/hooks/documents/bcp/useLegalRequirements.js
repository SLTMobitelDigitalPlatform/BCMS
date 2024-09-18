import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const useLegalRequirements = () => {
  const [legalRequirements, setLegalRequirements] = useState([]);
  const [legalRequirement, setLegalRequirement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all legal regulatory and contractual requirements
  const fetchLegalRequirements = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/bcpLegalRequirement");
      setLegalRequirements(response.data);
    } catch (err) {
      handleError("Error fetching legal regualtory and contractual requirements.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the last legal regulatory and contractual requirement
  const fetchLastLegalRequirement = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/bcpLegalRequirement/last");
      setLegalRequirement(response.data);
    } catch (err) {
      handleError("Error fetching last legal regualtory and contractual requirements", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single legal regulatory and contractual requirement by ID
  const fetchLegalRequirementById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpLegalRequirement/${id}`
      );
      setLegalRequirement(response.data);
    } catch (err) {
      handleError("Error fetching legal regualtory and contractual requirements.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new legal regulatory and contractual requirement
  const addLegalRequirement = async (documentData) => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/bcpLegalRequirement/add", documentData);
      await fetchLegalRequirements(); // refresh the list after adding
    } catch (err) {
      handleError("Error adding legal regualtory and contractual requirements.", err);
    } finally {
      setLoading(false);
    }
  };

  // Update an legal regulatory and contractual requirement
  const updateLegalRequirement = async (id, documentData) => {
    setLoading(true);
    try {
      await axiosInstance.put(
        `/api/bcpLegalRequirement/edit/${id}`,
        documentData
      );
      await fetchLegalRequirements(); // refresh the list after updating
    } catch (err) {
      handleError("Error updating legal regualtory and contractual requirements.", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete an legal regulatory and contractual requirement
  const deleteLegalRequirement = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/bcpLegalRequirement/delete/${id}`);
      await fetchLegalRequirements(); // refresh the list after deleting
    } catch (err) {
      handleError("Error deleting legal regualtory and contractual requirements.", err);
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
    legalRequirements,
    legalRequirement,
    loading,
    error,
    fetchLegalRequirements,
    fetchLastLegalRequirement,
    fetchLegalRequirementById,
    addLegalRequirement,
    updateLegalRequirement,
    deleteLegalRequirement,
  };
};
