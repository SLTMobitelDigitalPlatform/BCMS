import { useState, useEffect } from "react";
import {
  createSection,
  deleteSection,
  getSections,
  updateSection,
} from "../services/sectionApi";

export const useSections = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await getSections();
        setSections(response.data);
        // console.log(response.data);
      } catch (err) {
        setError("Error fetching sections data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const addSection = async (sectionData) => {
    try {
      await createSection(sectionData);
      // Refresh the sections list after adding
      const response = await getSections();
      setSections(response.data);
    } catch (err) {
      console.error("Error adding section", err.response?.data || err);
    }
  };

  const editSection = async (id, updatedData) => {
    try {
      await updateSection(id, updatedData);
      // Refresh the sections list after updating
      const response = await getSections();
      setSections(response.data);
    } catch (err) {
      console.error("Error updating section", err.response?.data || err);
    }
  };

  const removeSection = async (id) => {
    try {
      await deleteSection(id);
      // Refresh the sections list after deletion
      const response = await getSections();
      setSections(response.data);
    } catch (err) {
      console.error("Error deleting section", err.response?.data || err);
    }
  };

  return {
    sections,
    loading,
    error,
    addSection,
    editSection,
    removeSection,
  };
};
