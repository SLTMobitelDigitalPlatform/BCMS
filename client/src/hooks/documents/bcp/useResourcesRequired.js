import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useResourcesRequired = (bcpid, id) => {
  const queryClient = useQueryClient();

  // Fetch all resources required by BCP ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["resourcesRequired", bcpid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpResourcesRequired/${bcpid}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching all resources required.", err);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single resource required by BCP ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["resourceRequired", bcpid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpResourcesRequired/${bcpid}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single resource required.", err);
      }
    },
    enabled: !!id,
  });

  // Create new resource required
  const { mutate: createDocument } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post(
          "/api/bcpResourcesRequired/add",
          data
        );
        return response.data;
      } catch (err) {
        handleError("Error creating resource required.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["resourcesRequired", bcpid]);
    },
  });

  // Update an existing resource required
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/bcpResourcesRequired/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating resource required.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["resourcesRequired", bcpid]);
    },
  });

  // Delete an existing resource required
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/bcpResourcesRequired/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting resource required.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["resourcesRequired", bcpid]);
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
