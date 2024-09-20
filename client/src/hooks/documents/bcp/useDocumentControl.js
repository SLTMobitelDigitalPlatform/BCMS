import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const useDocumentControl = () => {
  const [documentControls, setDocumentControls] = useState([]);
  const [documentControl, setDocumentControl] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all document controls
  // const fetchDocumentControls = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/api/bcpDocumentControl");
  //     setDocumentControls(response.data);
  //   } catch (err) {
  //     handleError("Error fetching document controls.", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch document controls by BCP ID
  const fetchDocumentControlsByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpDocumentControl/${bcpid}`
      );
      setDocumentControls(response.data);
    } catch (err) {
      handleError("Error fetching document controls.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single legal requirement by BCP ID and Mongo ID
  const fetchDocumentControlsByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpDocumentControl/${bcpid}/${id}`
      );
      setDocumentControl(response.data);
    } catch (err) {
      handleError("Error fetching document control.", err);
    } finally {
      setLoading(false);
    }
  };

  //  Fetch the last document control
  // const fetchLastDocumentControl = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/api/bcpDocumentControl/last");
  //     return response.data;
  //   } catch (err) {
  //     handleError("Error fetching last document control.", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Add a new document control
  const addDocumentControl = async (documentControlData) => {
    setLoading(true);
    try {
      await axiosInstance.post(
        "/api/bcpDocumentControl/add",
        documentControlData
      );
    } catch (err) {
      handleError("Error adding document control.", err);
    } finally {
      setLoading(false);
    }
  };

  // Update a document control
  const updateDocumentControl = async (id, documentControlData) => {
    setLoading(true);
    try {
      await axiosInstance.put(
        `/api/bcpDocumentControl/edit/${id}`,
        documentControlData
      );
    } catch (err) {
      handleError("Error updating document control.", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a document control
  const deleteDocumentControl = async (id, bcpid) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/bcpDocumentControl/delete/${id}`);
      await fetchDocumentControlsByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting document control.", err);
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
    documentControls,
    documentControl,
    loading,
    error,
    // fetchDocumentControls,
    fetchDocumentControlsByBCPID,
    fetchDocumentControlsByIds,
    // fetchLastDocumentControl,
    addDocumentControl,
    updateDocumentControl,
    deleteDocumentControl,
  };
};
