import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const usePeaksDeadline = () => {
  const [peaksDeadlines, setPeaksDeadlines] = useState([]);
  const [peaksDeadline, setPeaksDeadline] = useState([]);
  const [loading, setLoading] = useState(false);

// Fetch Operating Sites by BIA ID
const fetchPeaksDeadlinesByBIAID = async (biaid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaPeaksDeadline/${biaid}`
      );
      setPeaksDeadlines(response.data);
    } catch (err) {
      handleError("Error fetching Operating Site.",err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single Operating Site by BIA ID and Mongo ID
  const fetchPeaksDeadlineByIds = async (biaid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaPeaksDeadline/${biaid}/${id}`
      );
      setPeaksDeadline(response.data);
    } catch (err) {
      handleError("Error fetching Operating Sites.",err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new Operating Site
  const addPeaksDeadline = async (documentData) => {
    try {
      await axiosInstance.post("/api/biaPeaksDeadline/add", documentData);
    } catch (err) {
      handleError("Error adding Operating Sites.",err);
    }
  };

  // Update an Operating Site
  const updatePeaksDeadline = async (id, documentData) => {
    try {
      await axiosInstance.put(
        `/api/biaPeaksDeadline/edit/${id}`,
        documentData
      );
    } catch (err) {
      handleError("Error updating Operating Sites.",err);
    }
  };

  // Delete an Operating Site
  const deletePeaksDeadline = async (id, biaid) => {
    try {
      await axiosInstance.delete(`/api/biaPeaksDeadline/delete/${id}`);
      await fetchPeaksDeadlinesByBIAID(biaid);
    } catch (err) {
      handleError("Error deleting Operating Sites.",err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    peaksDeadlines,
    peaksDeadline,
    loading,
    fetchPeaksDeadlinesByBIAID,
    fetchPeaksDeadlineByIds,
    addPeaksDeadline,
    updatePeaksDeadline,
    deletePeaksDeadline,
  };
};
