import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useRecoveryAndResumptions = (bcpid, cbfid, id) => {
  const queryClient = useQueryClient();

  // Fetch all recovery and resumptions by BCP ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["recoveryResumptions", bcpid, cbfid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpRecoveryResumption/${bcpid}/${cbfid}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching all recovery and resumptions.", err);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single recovery and resumption by BCP ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["recoveryResumption", bcpid, cbfid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpRecoveryResumption/${bcpid}/${cbfid}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single recovery and resumption.", err);
      }
    },
    enabled: !!id,
  });

  // Create new recovery and resumption
  const { mutate: createDocument } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post(
          "/api/bcpRecoveryResumption/add",
          data
        );
        return response.data;
      } catch (err) {
        handleError("Error creating recovery and resumption.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recoveryResumptions", bcpid]);
    },
  });

  // Update an existing recovery and resumption
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/bcpRecoveryResumption/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating recovery and resumption.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recoveryResumptions", bcpid]);
    },
  });

  // Delete an existing recovery and resumption
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/bcpRecoveryResumption/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting recovery and resumption.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recoveryResumptions", bcpid]);
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
