import { useState } from "react";
import axiosInstance from "../services/axiosInstance";

export const useSections = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sections
  const fetchSections = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/sections");
      setSections(response.data);
    } catch (err) {
      handleError("Error fetching sections data.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add section
  const addSection = async (sectionData) => {
    try {
      await axiosInstance.post("/api/section/create", sectionData);
      await fetchSections();
    } catch (err) {
      handleError("Error adding section", err);
    }
  };

  // Edit section
  const editSection = async (id, updatedData) => {
    try {
      await axiosInstance.put(`/api/section/edit/${id}`, updatedData);
      await fetchSections();
    } catch (err) {
      handleError("Error updating section", err);
    }
  };

  // Remove section
  const removeSection = async (id) => {
    try {
      await axiosInstance.delete(`/api/section/delete/${id}`);
      await fetchSections();
    } catch (err) {
      handleError("Error deleting section", err);
    }
  };

  const sortedSections = sections
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((section) => ({
      value: section.sectionCode,
      label: `${section.name} (${section.sectionCode})`,
    }));

  // Handle errors
  const handleError = (message, err) => {
    setError(message);
    console.error(message, err.response?.data || err);
  };

  // export const useSections = (selectedSectionId = null)

  // Fetch a section by ID when the selectedSectionId changes
  // useEffect(() => {
  //   if (selectedSectionId) {
  //     const fetchSectionById = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await axiosInstance.get(
  //           `/api/section/${selectedSectionId}`
  //         );
  //         setSection(response.data);
  //       } catch (err) {
  //         setError(`Error fetching section with ID: ${selectedSectionId}`);
  //         console.error(err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchSectionById();
  //   }
  // }, [selectedSectionId]);

  return {
    // section,
    sections,
    sortedSections,
    loading,
    error,
    fetchSections,
    addSection,
    editSection,
    removeSection,
  };
};
