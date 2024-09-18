import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const useDocumentControl = () => {
  const [documentControl, setDocumentControl] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all document controls
  const fetchDocumentControls = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/bcpDocumentControl");
      setDocumentControl(response.data);
    } catch (err) {
      handleError("Error fetching document controls.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch document controls by BCP ID
  const fetchDocumentControlsByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpDocumentControl/${bcpid}`
      );
      setDocumentControl(response.data);
    } catch (err) {
      handleError("Error fetching document controls.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new document control
  const addDocumentControl = async (documentControlData) => {
    setLoading(true);
    try {
      await axiosInstance.post(
        "/api/bcpDocumentControl/add",
        documentControlData
      );
      await fetchDocumentControls(); // refresh the list after adding
    } catch (err) {
      handleError("Error adding document control.", err);
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
    documentControl,
    loading,
    error,
    fetchDocumentControls,
    fetchDocumentControlsByBCPID,
    addDocumentControl,
  };
};
