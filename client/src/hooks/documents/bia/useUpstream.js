import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useUpstream = () => {
  const [upstreams, setUpstreams] = useState([]);
  const [upstream, setUpstream] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch upstream data by BIA ID
  const fetchUpstreamsByBIAID = async (biaid, cbfid = null) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/biaUpstream/${biaid}`, {
        params: {
          criticalBusinessFunction: cbfid ? cbfid : null,
        },
      });
      setUpstreams(response.data);
    } catch (err) {
      handleError("Error fetching upstream data.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Fetch upstream data by BIA ID and Mongo ID
  const fetchUpstreamByIds = async (biaid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/biaUpstream/${biaid}/${id}`
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
      await axiosInstance.post("/api/biaUpstream/add", data);
    } catch (err) {
      handleError("Error creating upstream.", err);
    }
  };

  //   Update a upstream
  const updateUpstream = async (id, updatedData) => {
    try {
      await axiosInstance.put(`/api/biaUpstream/edit/${id}`, updatedData);
    } catch (err) {
      handleError("Error updating upstream.", err);
    }
  };

  //   Delete a upstream
  const deleteUpstream = async (id, biaid) => {
    try {
      await axiosInstance.delete(`/api/biaUpstream/delete/${id}`);
      await fetchUpstreamsByBIAID(biaid);
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
    fetchUpstreamsByBIAID,
    fetchUpstreamByIds,
    createUpstream,
    updateUpstream,
    deleteUpstream,
  };
};
