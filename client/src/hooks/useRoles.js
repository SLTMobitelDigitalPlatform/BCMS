import { useState, useEffect } from "react";

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data);
      } catch (err) {
        setError("Error fetching roles data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);
  return { roles, loading, error };
};
