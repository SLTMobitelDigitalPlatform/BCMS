import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useUpstream = (biaid, cbfid, id) => {
  const queryClient = useQueryClient();

  // Fetch all upstreams by BIA ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["upstreams", biaid, cbfid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/api/biaUpstream/${biaid}`, {
          params: {
            criticalBusinessFunction: cbfid,
          },
        });
        return response.data;
      } catch (err) {
        handleError("Error fetching all upstreams.", err);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single upstream by BIA ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["upstream", biaid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/biaUpstream/${biaid}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single upstream.", err);
      }
    },
    enabled: !!id,
  });

  // Create new upstream
  const { mutate: createDocument } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post("/api/biaUpstream/add", data);
        return response.data;
      } catch (err) {
        handleError("Error creating upstream.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upstreams", biaid]);
    },
  });

  // Update an existing upstream
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/biaUpstream/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating upstream.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upstreams", biaid]);
    },
  });

  // Delete an existing upstream
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/biaUpstream/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting upstream.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upstreams", biaid]);
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
