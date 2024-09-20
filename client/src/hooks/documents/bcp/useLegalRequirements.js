import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

export const useLegalRequirements = () => {
  const [legalRequirements, setLegalRequirements] = useState([]);
  const [legalRequirement, setLegalRequirement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all legal regulatory and contractual requirements
  // const fetchLegalRequirements = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/api/bcpLegalRequirement");
  //     setLegalRequirements(response.data);
  //   } catch (err) {
  //     handleError(
  //       "Error fetching legal, regualtory and contractual requirements.",
  //       err
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch legal requirements by BCP ID
  const fetchLegalRequirementsByBCPID = async (bcpid) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpLegalRequirement/${bcpid}`
      );
      setLegalRequirements(response.data);
    } catch (err) {
      handleError(
        "Error fetching legal, regualtory and contractual requirements.",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch the last legal requirement
  // const fetchLastLegalRequirement = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/api/bcpLegalRequirement/last");
  //     setLegalRequirement(response.data);
  //   } catch (err) {
  //     handleError(
  //       "Error fetching last legal, regualtory and contractual requirements",
  //       err
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch a single legal requirement by BCP ID and Mongo ID
  const fetchLegalRequirementByIds = async (bcpid, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/bcpLegalRequirement/${bcpid}/${id}`
      );
      setLegalRequirement(response.data);
    } catch (err) {
      handleError(
        "Error fetching legal, regualtory and contractual requirements.",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  // Add a new legal requirement
  const addLegalRequirement = async (documentData) => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/bcpLegalRequirement/add", documentData);
    } catch (err) {
      handleError(
        "Error adding legal, regualtory and contractual requirements.",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  // Update an legal requirement
  const updateLegalRequirement = async (id, documentData) => {
    setLoading(true);
    try {
      await axiosInstance.put(
        `/api/bcpLegalRequirement/edit/${id}`,
        documentData
      );
    } catch (err) {
      handleError(
        "Error updating legal, regualtory and contractual requirements.",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete an legal requirement
  const deleteLegalRequirement = async (id, bcpid) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/bcpLegalRequirement/delete/${id}`);
      await fetchLegalRequirementsByBCPID(bcpid);
    } catch (err) {
      handleError(
        "Error deleting legal, regualtory and contractual requirements.",
        err
      );
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
    legalRequirements,
    legalRequirement,
    loading,
    error,
    // fetchLegalRequirements,
    fetchLegalRequirementsByBCPID,
    // fetchLastLegalRequirement,
    fetchLegalRequirementByIds,
    addLegalRequirement,
    updateLegalRequirement,
    deleteLegalRequirement,
  };
};
