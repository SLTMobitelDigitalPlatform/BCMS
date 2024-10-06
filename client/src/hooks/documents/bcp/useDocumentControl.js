import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useDocumentControl = (bcpid, id) => {
  const queryClient = useQueryClient();

  // Fetch all document controls by BCP ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["documentControls", bcpid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpDocumentControl/${bcpid}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching all document controls.", err);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single document control by BCP ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["documentControl", bcpid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpDocumentControl/${bcpid}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single document control.", err);
      }
    },
    enabled: !!id,
  });

  // Create new document control
  const { mutate: createDocument } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post(
          "/api/bcpDocumentControl/add",
          data
        );
        return response.data;
      } catch (err) {
        handleError("Error creating document control.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["documentControls", bcpid]);
    },
  });

  // Update an existing document control
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/bcpDocumentControl/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating document control.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["documentControls", bcpid]);
    },
  });

  // Delete an existing document control
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/bcpDocumentControl/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting document control.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["documentControls", bcpid]);
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
