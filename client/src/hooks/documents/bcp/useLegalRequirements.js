import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useLegalRequirements = (bcpid, id) => {
  const queryClient = useQueryClient();

  // Fetch all legal requirements by BCP ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["legalRequirements", bcpid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpLegalRequirement/${bcpid}`
        );
        return response.data;
      } catch (err) {
        handleError(
          "Error fetching all legal, regualtory and contractual requirements.",
          err
        );
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single legal requirement by BCP ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["legalRequirement", bcpid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpLegalRequirement/${bcpid}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError(
          "Error fetching single legal, regualtory and contractual requirement.",
          err
        );
      }
    },
    enabled: !!id,
  });

  // Create new legal requirement
  const { mutate: createDocument } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post(
          "/api/bcpLegalRequirement/add",
          data
        );
        return response.data;
      } catch (err) {
        handleError(
          "Error creating legal, regualtory and contractual requirement.",
          err
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["legalRequirements", bcpid]);
    },
  });

  // Update an existing legal requirement
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/bcpLegalRequirement/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError(
          "Error updating legal, regualtory and contractual requirement.",
          err
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["legalRequirements", bcpid]);
    },
  });

  // Delete an existing legal requirement
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/bcpLegalRequirement/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError(
          "Error deleting legal, regualtory and contractual requirement.",
          err
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["legalRequirements", bcpid]);
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
