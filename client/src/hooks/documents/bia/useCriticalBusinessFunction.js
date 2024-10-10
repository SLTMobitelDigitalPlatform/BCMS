import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useCriticalBusinessFunction = (biaid, id) => {
  const queryClient = useQueryClient();

  // Fetch all critical business functions by BIA ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["criticalBusinessFunctions", biaid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/biaCriticalBusinessFunction/${biaid}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching all critical business functions.", err);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single critical business function by BIA ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["criticalBusinessFunction", biaid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/biaCriticalBusinessFunction/${biaid}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single critical business function.", err);
      }
    },
    enabled: !!id,
  });

  // Create new critical business function
  const { mutate: createDocument } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post(
          "/api/biaCriticalBusinessFunction/add",
          data
        );
        return response.data;
      } catch (err) {
        handleError("Error creating critical business function.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["criticalBusinessFunctions", biaid]);
    },
  });

  // Update an existing critical business function
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/biaCriticalBusinessFunction/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating critical business function.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["criticalBusinessFunctions", biaid]);
    },
  });

  // Delete an existing critical business function
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/biaCriticalBusinessFunction/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting critical business function.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["criticalBusinessFunctions", biaid]);
    },
  });

  const sortedCBFunctions = (allDocuments ?? [])
    .slice()
    .sort((a, b) => a.functionName.localeCompare(b.functionName))
    .map((cbf) => ({ value: cbf._id, label: cbf.functionName }));

  // Handle errors
  const handleError = (message, err) => {
    console.error(message, err.response?.data || err);
    errorAlert("Error", message);
  };

  return {
    allDocuments,
    singleDocument,
    sortedCBFunctions,
    isLoading: id ? isLoadingSingle : isLoadingAll,
    createDocument,
    updateDocument,
    deleteDocument,
  };
};
