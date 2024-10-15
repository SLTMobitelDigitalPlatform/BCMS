import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useRecoveryStrategy = (bcpid, id) => {
  const queryClient = useQueryClient();

  // Fetch all recovery strategies by BCP ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["recoveryStrategies", bcpid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpRecoveryStrategy/${bcpid}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching all recovery strategies.", err);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single recovery strategy by BCP ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["recoveryStrategy", bcpid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpRecoveryStrategy/${bcpid}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single recovery strategy.", err);
      }
    },
    enabled: !!id,
  });

  // Create new recovery strategy
  const { mutate: createDocument } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post(
          "/api/bcpRecoveryStrategy/add",
          data
        );
        return response.data;
      } catch (err) {
        handleError("Error creating recovery strategy.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recoveryStrategies", bcpid]);
    },
  });

  // Update an existing recovery strategy
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/bcpRecoveryStrategy/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating recovery strategy.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recoveryStrategies", bcpid]);
    },
  });

  // Delete an existing recovery strategy
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/bcpRecoveryStrategy/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting recovery strategy.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recoveryStrategies", bcpid]);
    },
  });

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    allDocuments,
    singleDocument,
    isLoading: id ? isLoadingSingle : isLoadingAll,
    createDocument,
    updateDocument,
    deleteDocument,
  };
};
