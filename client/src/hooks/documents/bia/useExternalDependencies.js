import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useExternalDependencies = () => {
  const [externalDependencies, setExternalDependencies] = useState([]);
  const [externalDependency, setExternalDependency] = useState([]);
  const [loading, setLoading] = useState(false);

  //   Fetch external dependencies by BIA ID
  const fetchExternalDependenciesByBIAID = async (biaid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaExternalDependencies/${biaid}`
      );
      setExternalDependencies(response.data);
    } catch (err) {
      handleError("Error fetching external dependencies.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Fetch a single external dependency by BIA ID and Mongo ID
  const fetchExternalDependencyByIds = async (biaid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaExternalDependencies/${biaid}/${id}`
      );
      setExternalDependency(response.data);
    } catch (err) {
      handleError("Error fetching external dependency.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Create a new external dependency
  const createExternalDependency = async (data) => {
    try {
      await axiosInstance.post("/api/biaExternalDependencies/add", data);
    } catch (err) {
      handleError("Error creating external dependency.", err);
    }
  };

  //   Update a external dependency
  const updateExternalDependency = async (id, updatedData) => {
    try {
      await axiosInstance.put(
        `/api/biaExternalDependencies/edit/${id}`,
        updatedData
      );
    } catch (err) {
      handleError("Error updating external dependency.", err);
    }
  };

  //   Delete a external dependency
  const deleteExternalDependency = async (id, biaid) => {
    try {
      await axiosInstance.delete(`/api/biaExternalDependencies/delete/${id}`);
      await fetchExternalDependenciesByBIAID(biaid);
    } catch (err) {
      handleError("Error deleting external dependency.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    externalDependency,
    externalDependencies,
    loading,
    fetchExternalDependenciesByBIAID,
    fetchExternalDependencyByIds,
    createExternalDependency,
    updateExternalDependency,
    deleteExternalDependency,
  };
};
