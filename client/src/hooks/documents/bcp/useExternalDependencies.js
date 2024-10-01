import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useExternalDependencies = () => {
  const [externalDependencies, setExternalDependencies] = useState([]);
  const [externalDependency, setExternalDependency] = useState([]);
  const [loading, setLoading] = useState(false);

  //   Fetch external dependencies by BCP ID
  const fetchExternalDependenciesByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpExternalDependencies/${bcpid}`
      );
      setExternalDependencies(response.data);
    } catch (err) {
      handleError("Error fetching external dependencies.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Fetch a single external dependency by BCP ID and Mongo ID
  const fetchExternalDependencyByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpExternalDependencies/${bcpid}/${id}`
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
      await axiosInstance.post("/api/bcpExternalDependencies/add", data);
    } catch (err) {
      handleError("Error creating external dependency.", err);
    }
  };

  //   Update a external dependency
  const updateExternalDependency = async (id, updatedData) => {
    try {
      await axiosInstance.put(
        `/api/bcpExternalDependencies/edit/${id}`,
        updatedData
      );
    } catch (err) {
      handleError("Error updating external dependency.", err);
    }
  };

  //   Delete a external dependency
  const deleteExternalDependency = async (id, bcpid) => {
    try {
      await axiosInstance.delete(`/api/bcpExternalDependencies/delete/${id}`);
      await fetchExternalDependenciesByBCPID(bcpid);
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
    fetchExternalDependenciesByBCPID,
    fetchExternalDependencyByIds,
    createExternalDependency,
    updateExternalDependency,
    deleteExternalDependency,
  };
};
