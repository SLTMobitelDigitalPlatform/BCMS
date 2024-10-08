import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useDownstream = (bcpid, cbfid, id) => {
  const queryClient = useQueryClient();

  // Fetch all downstreams by BCP ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["downstreams", bcpid, cbfid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpDownstream/${bcpid}`,
          {
            params: {
              criticalBusinessFunction: cbfid,
            },
          }
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching all downstreams.", err);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single downstream by BCP ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["downstream", bcpid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpDownstream/${bcpid}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single downstream.", err);
      }
    },
    enabled: !!id,
  });

  // Create new downstream
  const { mutate: createDocument } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post(
          "/api/bcpDownstream/add",
          data
        );
        return response.data;
      } catch (err) {
        handleError("Error creating downstream.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["downstreams", bcpid]);
    },
  });

  // Update an existing downstream
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/bcpDownstream/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating downstream.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["downstreams", bcpid]);
    },
  });

  // Delete an existing downstream
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/bcpDownstream/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting downstream.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["downstreams", bcpid]);
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
