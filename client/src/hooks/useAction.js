import { useState } from "react";
import axiosInstance from "../services/axiosInstance";

export const useAction = () => {
  const [action, setAction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch action
  const fetchAction = async (meetingId) => {
    try {
      const response = await axiosInstance.get(
        `/getsingleActionData/${meetingId}`
      );
      setAction(response.data);
    } catch (err) {
      setError("Error fetching actions data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
};
