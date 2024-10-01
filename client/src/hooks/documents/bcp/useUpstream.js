import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useUpstream = () => {
  const [upstreams, setUpstreams] = useState(null);
  const [upstream, setUpstream] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch upstream data by BCP ID
  const fetchUpstreamsByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/bcpUpstream/${bcpid}`);
      setUpstreams(response.data);
    } catch (err) {
      handleError("Error fetching upstream data.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Fetch upstream data by BCP ID and Mongo ID
  const fetchUpstreamByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpUpstream/${bcpid}/${id}`
      );
      setUpstream(response.data);
    } catch (err) {
      handleError("Error fetching upstream data.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Create a new upstream
  const createUpstream = async (data) => {
    try {
      await axiosInstance.post("/api/bcpUpstream/add", data);
    } catch (err) {
      handleError("Error creating upstream.", err);
    }
  };

  //   Update a upstream
  const updateUpstream = async (id, updatedData) => {
    try {
      await axiosInstance.put(`/api/bcpUpstream/edit/${id}`, updatedData);
    } catch (err) {
      handleError("Error updating upstream.", err);
    }
  };

  //   Delete a upstream
  const deleteUpstream = async (id, bcpid) => {
    try {
      await axiosInstance.delete(`/api/bcpUpstream/delete/${id}`);
      await fetchUpstreamsByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting upstream.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    upstream,
    upstreams,
    loading,
    fetchUpstreamsByBCPID,
    fetchUpstreamByIds,
    createUpstream,
    updateUpstream,
    deleteUpstream,
  };
};
