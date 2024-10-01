import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const usePeaksDeadline = () => {
  const [PeaksDeadlines, setPeaksDeadlines] = useState([]);
  const [PeaksDeadline, setPeaksDeadline] = useState([]);
  const [loading, setLoading] = useState(false);

// Fetch Peaks And Deadlines by BIA ID
const fetchPeaksDeadlinesByBIAID = async (biaid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaPeaksDeadline/${biaid}`
      );
      setPeaksDeadlines(response.data);
    } catch (err) {
      handleError("Error fetching Peaks And Deadline.",err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single Peaks And Deadline by BIA ID and Mongo ID
  const fetchPeaksDeadlineByIds = async (biaid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaPeaksDeadline/${biaid}/${id}`
      );
      setPeaksDeadline(response.data);
    } catch (err) {
      handleError("Error fetching Peaks And Deadlines.",err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new Peaks And Deadline
  const addPeaksDeadline = async (documentData) => {
    try {
      await axiosInstance.post("/api/biaPeaksDeadline/add", documentData);
    } catch (err) {
      handleError("Error adding Peaks And Deadlines.",err);
    }
  };

  // Update an Peaks And Deadline
  const updatePeaksDeadline = async (id, documentData) => {
    try {
      await axiosInstance.put(
        `/api/biaPeaksDeadline/edit/${id}`,
        documentData
      );
    } catch (err) {
      handleError("Error updating Peaks And Deadlines.",err);
    }
  };

  // Delete an Peaks And Deadline
  const deletePeaksDeadline = async (id, biaid) => {
    try {
      await axiosInstance.delete(`/api/biaPeaksDeadline/delete/${id}`);
      await fetchPeaksDeadlinesByBIAID(biaid);
    } catch (err) {
      handleError("Error deleting Peaks And Deadlines.",err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    PeaksDeadlines,
    PeaksDeadline,
    loading,
    fetchPeaksDeadlinesByBIAID,
    fetchPeaksDeadlineByIds,
    addPeaksDeadline,
    updatePeaksDeadline,
    deletePeaksDeadline,
  };
};
