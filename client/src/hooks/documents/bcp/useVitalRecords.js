import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const useVitalRecords = () => {
  const [vitalRecords, setVitalRecords] = useState([]);
  const [vitalRecord, setVitalRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all vital records
  // const fetchVitalRecords = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/api/bcpVitalRecords");
  //     setVitalRecords(response.data);
  //   } catch (err) {
  //     handleError("Error fetching vital records.", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch vital records by BCP ID
  const fetchVitalRecordsByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/bcpVitalRecords/${bcpid}`);
      setVitalRecords(response.data);
    } catch (err) {
      handleError("Error fetching vital records.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the last vital record
  // const fetchLastVitalRecord = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/api/bcpVitalRecords/last");
  //     return response.data;
  //   } catch (err) {
  //     handleError("Error fetching last vital record.", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch a single vital record by BCP ID and Mongo ID
  const fetchVitalRecordByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpVitalRecords/${bcpid}/${id}`
      );
      setVitalRecord(response.data);
    } catch (err) {
      handleError("Error fetching vital record.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new vital record
  const addVitalRecord = async (vitalRecordData) => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/bcpVitalRecords/add", vitalRecordData);
    } catch (err) {
      handleError("Error adding vital record.", err);
    } finally {
      setLoading(false);
    }
  };

  // Update a vital record
  const updateVitalRecord = async (id, vitalRecordData) => {
    setLoading(true);
    try {
      await axiosInstance.put(
        `/api/bcpVitalRecords/edit/${id}`,
        vitalRecordData
      );
    } catch (err) {
      handleError("Error updating vital record.", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a vital record
  const deleteVitalRecord = async (id, bcpid) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/bcpVitalRecords/delete/${id}`);
      await fetchVitalRecordsByBCPID(bcpid);
    } catch (err) {
      handleError("Error deleting vital record.", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    setError(message);
    console.error(message, err.response?.data || err);
  };

  return {
    vitalRecords,
    vitalRecord,
    loading,
    error,
    // fetchVitalRecords,
    fetchVitalRecordsByBCPID,
    fetchVitalRecordByIds,
    // fetchLastVitalRecord,
    addVitalRecord,
    updateVitalRecord,
    deleteVitalRecord,
  };
};
