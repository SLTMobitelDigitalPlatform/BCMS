import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const useEmbeddedDocuments = () => {
  const [embeddedDocuments, setEmbeddedDocuments] = useState([]);
  const [embeddedDocument, setEmbeddedDocument] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all embedded documents
  const fetchEmbeddedDocuments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/bcpEmbeddedDocument");
      setEmbeddedDocuments(response.data);
    } catch (err) {
      handleError("Error fetching embedded documents.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the last embedded document
  const fetchLastEmbeddedDocument = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/bcpEmbeddedDocument/last");
      return response.data;
    } catch (err) {
      handleError("Error fetching last embedded document.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single embedded document by ID
  const fetchEmbeddedDocumentById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpEmbeddedDocument/${id}`
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
      await fetchEmbeddedDocuments(); // refresh the list after adding
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
      await fetchEmbeddedDocuments(); // refresh the list after updating
    } catch (err) {
      handleError("Error updating embedded document.", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete an embedded document
  const deleteEmbeddedDocument = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/bcpEmbeddedDocument/delete/${id}`);
      await fetchEmbeddedDocuments(); // refresh the list after deleting
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
    fetchEmbeddedDocuments,
    fetchLastEmbeddedDocument,
    fetchEmbeddedDocumentById,
    addEmbeddedDocument,
    updateEmbeddedDocument,
    deleteEmbeddedDocument,
  };
};
