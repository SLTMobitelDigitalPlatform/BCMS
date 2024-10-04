import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useDownstream = () => {
  const [downstreams, setDownstreams] = useState([]);
  const [downstream, setDownstream] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch downstream data by BCP ID
  const fetchDownstreamsByBCPID = async (bcpid, cbfid = null) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/bcpDownstream/${bcpid}`, {
        params: {
          criticalBusinessFunction: cbfid ? cbfid : null,
        },
      });
      setDownstreams(response.data);
    } catch (err) {
      handleError("Error fetching upstream data.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Fetch downstream data by BCP ID and Mongo ID
  const fetchDownstreamByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpDownstream/${bcpid}/${id}`
      );
      setDownstream(response.data);
    } catch (err) {
      handleError("Error fetching downstream data.", err);
    } finally {
      setLoading(false);
    }
  };

  //   Create a new downstream
  const createDownstream = async (data) => {
    try {
      await axiosInstance.post("/api/bcpDownstream/add", data);
    } catch (err) {
      handleError("Error creating downstream.", err);
    }
  };

  //   Update a downstream
  const updateDownstream = async (id, updatedData) => {
    try {
      await axiosInstance.put(`/api/bcpDownstream/edit/${id}`, updatedData);
    } catch (err) {
      handleError("Error updating downstream.", err);
    }
  };

  //   Delete a downstream
  const deleteDownstream = async (id, bcpid) => {
    try {
      await axiosInstance.delete(`/api/bcpDownstream/delete/${id}`);
      await fetchDownstreamsByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting downstream.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    downstream,
    downstreams,
    loading,
    createDownstream,
    fetchDownstreamsByBCPID,
    fetchDownstreamByIds,
    updateDownstream,
    deleteDownstream,
  };
};
