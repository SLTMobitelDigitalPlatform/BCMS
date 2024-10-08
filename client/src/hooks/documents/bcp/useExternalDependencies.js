import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useExternalDependencies = (bcpid, id) => {
  const queryClient = useQueryClient();

  // Fetch all external dependencies by BCP ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["externalDependencies", bcpid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpExternalDependencies/${bcpid}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching all external dependencies.", err);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single external dependency by BCP ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["externalDependency", bcpid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpExternalDependencies/${bcpid}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single external dependency.", err);
      }
    },
    enabled: !!id,
  });

  // Create new external dependency
  const { mutate: createDocument } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post(
          "/api/bcpExternalDependencies/add",
          data
        );
        return response.data;
      } catch (err) {
        handleError("Error creating external dependency.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["externalDependencies", bcpid]);
    },
  });

  // Update an existing external dependency
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/bcpExternalDependencies/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating external dependency.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["externalDependencies", bcpid]);
    },
  });

  // Delete an existing external dependency
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/bcpExternalDependencies/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting external dependency.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["externalDependencies", bcpid]);
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
