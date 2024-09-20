import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const useEmbeddedDocuments = () => {
  const [embeddedDocuments, setEmbeddedDocuments] = useState([]);
  const [embeddedDocument, setEmbeddedDocument] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all embedded documents
  // const fetchEmbeddedDocuments = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/api/bcpEmbeddedDocument");
  //     setEmbeddedDocuments(response.data);
  //   } catch (err) {
  //     handleError("Error fetching embedded documents.", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch embedded documents by BCP ID
  const fetchEmbeddedDocumentsByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpEmbeddedDocument/${bcpid}`
      );
      setEmbeddedDocuments(response.data);
    } catch (err) {
      handleError("Error fetching embedded documents.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the last embedded document
  // const fetchLastEmbeddedDocument = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/api/bcpEmbeddedDocument/last");
  //     return response.data;
  //   } catch (err) {
  //     handleError("Error fetching last embedded document.", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch a single embedded document by BCP ID and Mongo ID
  const fetchEmbeddedDocumentByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpEmbeddedDocument/${bcpid}/${id}`
      );
      setEmbeddedDocument(response.data);
    } catch (err) {
      handleError("Error fetching embedded document.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new embedded document
  const addEmbeddedDocument = async (documentData) => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/bcpEmbeddedDocument/add", documentData);
    } catch (err) {
      handleError("Error adding embedded document.", err);
    } finally {
      setLoading(false);
    }
  };

  // Update an embedded document
  const updateEmbeddedDocument = async (id, documentData) => {
    setLoading(true);
    try {
      await axiosInstance.put(
        `/api/bcpEmbeddedDocument/edit/${id}`,
        documentData
      );
    } catch (err) {
      handleError("Error updating embedded document.", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete an embedded document
  const deleteEmbeddedDocument = async (id, bcpid) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/bcpEmbeddedDocument/delete/${id}`);
      await fetchEmbeddedDocumentsByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting embedded document.", err);
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
    embeddedDocuments,
    embeddedDocument,
    loading,
    error,
    // fetchEmbeddedDocuments,
    fetchEmbeddedDocumentsByBCPID,
    fetchEmbeddedDocumentByIds,
    // fetchLastEmbeddedDocument,
    addEmbeddedDocument,
    updateEmbeddedDocument,
    deleteEmbeddedDocument,
  };
};
