import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const usePreIncidentPreparation = (bcpid, id) => {
  const queryClient = useQueryClient();

  // Fetch all pre-incident preparations by BCP ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["preIncidentPreparations", bcpid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpPreIncidentPreparation/${bcpid}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching all pre-incident preparations.", err);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single pre-incident preparation by BCP ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["preIncidentPreparation", bcpid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpPreIncidentPreparation/${bcpid}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single pre-incident preparation.", err);
      }
    },
    enabled: !!id,
  });

  // Create new pre-incident preparation
  const { mutate: createDocument } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post(
          "/api/bcpPreIncidentPreparation/add",
          data
        );
        return response.data;
      } catch (err) {
        handleError("Error creating pre-incident preparation.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["preIncidentPreparations", bcpid]);
    },
  });

  // Update an existing pre-incident preparation
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/bcpPreIncidentPreparation/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating pre-incident preparation.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["preIncidentPreparations", bcpid]);
    },
  });

  // Delete an existing pre-incident preparation
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/bcpPreIncidentPreparation/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting pre-incident preparation.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["preIncidentPreparations", bcpid]);
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
