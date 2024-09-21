import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useEmbeddedDocuments = () => {
  const [embeddedDocuments, setEmbeddedDocuments] = useState([]);
  const [embeddedDocument, setEmbeddedDocument] = useState([]);
  const [loading, setLoading] = useState(true);

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
    try {
      await axiosInstance.post("/api/bcpEmbeddedDocument/add", documentData);
    } catch (err) {
      handleError("Error adding embedded document.", err);
    }
  };

  // Update an embedded document
  const updateEmbeddedDocument = async (id, documentData) => {
    try {
      await axiosInstance.put(
        `/api/bcpEmbeddedDocument/edit/${id}`,
        documentData
      );
    } catch (err) {
      handleError("Error updating embedded document.", err);
    }
  };

  // Delete an embedded document
  const deleteEmbeddedDocument = async (id, bcpid) => {
    try {
      await axiosInstance.delete(`/api/bcpEmbeddedDocument/delete/${id}`);
      await fetchEmbeddedDocumentsByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting embedded document.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    embeddedDocuments,
    embeddedDocument,
    loading,
    // fetchEmbeddedDocuments,
    fetchEmbeddedDocumentsByBCPID,
    fetchEmbeddedDocumentByIds,
    // fetchLastEmbeddedDocument,
    addEmbeddedDocument,
    updateEmbeddedDocument,
    deleteEmbeddedDocument,
  };
};

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
