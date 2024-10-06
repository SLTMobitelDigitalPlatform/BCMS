import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useRelatedDocuments = (bcpid, id) => {
  const queryClient = useQueryClient();

  // Fetch all related documents by BCP ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["relatedDocuments", bcpid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpRelatedDocuments/${bcpid}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching all related documents.", err);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single related document by BCP ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["relatedDocument", bcpid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpRelatedDocuments/${bcpid}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single related document.", err);
      }
    },
    enabled: !!id,
  });

  // Create new related document
  const { mutate: createDocument } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post(
          "/api/bcpRelatedDocuments/add",
          data
        );
        return response.data;
      } catch (err) {
        handleError("Error creating related document.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relatedDocuments", bcpid]);
    },
  });

  // Update an existing related document
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/bcpRelatedDocuments/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating related document.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relatedDocuments", bcpid]);
    },
  });

  // Delete an existing related document
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/bcpRelatedDocuments/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting related document.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relatedDocuments", bcpid]);
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
