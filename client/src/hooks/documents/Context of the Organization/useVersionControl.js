import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useVersionControl = () => {
  const [versionControls, setVersionControls] = useState([]);
  const [versionControl, setVersionControl] = useState([]);
  const [loading, setLoading] = useState(false);

  //   Fetch version controls
  const fetchVersionControls = async () => {
    try {
      const response = await axiosInstance.get("/api/versionControls/");
      setVersionControls(response.data);
    } catch (err) {
      handleError("Error fetching version controls.", err);
    }
  };

  //   Fetch a single version control
  const fetchVersionControl = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/versionControls/${id}`);
      setVersionControl(response.data);
    } catch (err) {
      handleError("Error fetching version control.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Fetch the last version control
  const fetchLastVersionControl = async () => {
    try {
      const response = await axiosInstance.get("/api/versionControls/last");
      setVersionControl(response.data);
    } catch (err) {
      handleError("Error fetching last version control.", err);
    }
  };

  //   Create a new version control
  const createVersionControl = async (data) => {
    try {
      await axiosInstance.post("/api/versionControls/add", data);
    } catch (err) {
      handleError("Error creating version control.", err);
    }
  };

  //    Update a version control
  const updateVersionControl = async (id, data) => {
    try {
      await axiosInstance.put(`/api/versionControls/edit/${id}`, data);
    } catch (err) {
      handleError("Error updating version control.", err);
    }
  };

  //   Delete a version control
  const deleteVersionControl = async (id) => {
    try {
      await axiosInstance.delete(`/api/versionControls/delete/${id}`);
      await fetchVersionControls();
    } catch (err) {
      handleError("Error deleting version control.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    versionControls,
    versionControl,
    loading,
    fetchVersionControls,
    fetchVersionControl,
    fetchLastVersionControl,
    createVersionControl,
    updateVersionControl,
    deleteVersionControl,
  };
};
