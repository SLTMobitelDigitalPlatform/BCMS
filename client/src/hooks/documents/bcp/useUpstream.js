import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useUpstream = (bcpid, cbfid, id) => {
  const queryClient = useQueryClient();

  // Fetch all upstreams by BCP ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["upstreams", bcpid, cbfid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/api/bcpUpstream/${bcpid}`, {
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

  // Fetch a single upstream by BCP ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["upstream", bcpid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpUpstream/${bcpid}/${id}`
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
        const response = await axiosInstance.post("/api/bcpUpstream/add", data);
        return response.data;
      } catch (err) {
        handleError("Error creating upstream.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upstreams", bcpid]);
    },
  });

  // Update an existing upstream
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/bcpUpstream/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating upstream.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upstreams", bcpid]);
    },
  });

  // Delete an existing upstream
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/bcpUpstream/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting upstream.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upstreams", bcpid]);
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
