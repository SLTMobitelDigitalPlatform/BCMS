import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useRelatedDocuments = () => {
  const [relatedDocuments, setRelatedDocuments] = useState([]);
  const [relatedDocument, setRelatedDocument] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch document controls by BCP ID
  const fetchRelatedDocumentsByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpRelatedDocuments/${bcpid}`
      );
      setRelatedDocuments(response.data);
    } catch (err) {
      handleError("Error fetching related documents.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single related document by BCP ID and Mongo ID
  const fetchRelatedDocumentByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpRelatedDocuments/${bcpid}/${id}`
      );
      setRelatedDocument(response.data);
    } catch (err) {
      handleError("Error fetching related document.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new related document
  const addRelatedDocument = async (relatedDocumentData) => {
    try {
      await axiosInstance.post(
        "/api/bcpRelatedDocuments/add",
        relatedDocumentData
      );
    } catch (err) {
      handleError("Error adding related document.", err);
    }
  };

  // Update a related document
  const updateRelatedDocument = async (id, relatedDocumentData) => {
    try {
      await axiosInstance.put(
        `/api/bcpRelatedDocuments/edit/${id}`,
        relatedDocumentData
      );
    } catch (err) {
      handleError("Error updating related document.", err);
    }
  };

  // Delete a related document
  const deleteRelatedDocument = async (id, bcpid) => {
    try {
      await axiosInstance.delete(`/api/bcpRelatedDocuments/delete/${id}`);
      await fetchRelatedDocumentsByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting related document.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    relatedDocument,
    relatedDocuments,
    loading,
    fetchRelatedDocumentsByBCPID,
    fetchRelatedDocumentByIds,
    addRelatedDocument,
    updateRelatedDocument,
    deleteRelatedDocument,
  };
};
