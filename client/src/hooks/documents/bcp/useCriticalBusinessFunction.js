import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/axiosInstance";
import { errorAlert } from "../../../utilities/alert";

export const useCriticalBusinessFunction = (bcpid, id) => {
  const queryClient = useQueryClient();

  // Fetch all critical business functions by BCP ID and cache the result
  const { data: allDocuments, isLoading: isLoadingAll } = useQuery({
    queryKey: ["criticalBusinessFunctions", bcpid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpCriticalBusinessFunction/${bcpid}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching all critical business functions.", err);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !id,
  });

  // Fetch a single critical business function by BCP ID and Mongo ID
  const { data: singleDocument, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["criticalBusinessFunction", bcpid, id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/bcpCriticalBusinessFunction/${bcpid}/${id}`
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
          "/api/bcpCriticalBusinessFunction/add",
          data
        );
        return response.data;
      } catch (err) {
        handleError("Error creating critical business function.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["criticalBusinessFunctions", bcpid]);
    },
  });

  // Update an existing critical business function
  const { mutate: updateDocument } = useMutation({
    mutationFn: async (updateData) => {
      try {
        const response = await axiosInstance.put(
          `/api/bcpCriticalBusinessFunction/edit/${id}`,
          updateData
        );
        return response.data;
      } catch (err) {
        handleError("Error updating critical business function.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["criticalBusinessFunctions", bcpid]);
    },
  });

  // Delete an existing critical business function
  const { mutate: deleteDocument } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosInstance.delete(
          `/api/bcpCriticalBusinessFunction/delete/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error deleting critical business function.", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["criticalBusinessFunctions", bcpid]);
    },
  });

  const sortedCBFunctions = (allDocuments ?? [])
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((cbf) => ({ value: cbf._id, label: cbf.name }));

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

//   //   Fetch critical business functions by BCP ID
//   const fetchCriticalBusinessFunctionsByBCPID = async (bcpid) => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(
//         `/api/bcpCriticalBusinessFunction/${bcpid}`
//       );
//       setCriticalBusinessFunctions(response.data);
//     } catch (err) {
//       handleError("Error fetching critical business functions.", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch a single critical business function by BCP ID and Mongo ID
//   const fetchCriticalBusinessFunctionsByIds = async (bcpid, id) => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(
//         `/api/bcpCriticalBusinessFunction/${bcpid}/${id}`
//       );
//       setCriticalBusinessFunction(response.data);
//     } catch (err) {
//       handleError("Error fetching critical business function.", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add a new critical business function
//   const addCriticalBusinessFunction = async (criticalBusinessFunctionData) => {
//     try {
//       await axiosInstance.post(
//         "/api/bcpCriticalBusinessFunction/add",
//         criticalBusinessFunctionData
//       );
//     } catch (err) {
//       handleError("Error adding critical business function.", err);
//     }
//   };

//   //   Update a critical business function
//   const updateCriticalBusinessFunction = async (
//     id,
//     criticalBusinessFunctionData
//   ) => {
//     try {
//       await axiosInstance.put(
//         `/api/bcpCriticalBusinessFunction/edit/${id}`,
//         criticalBusinessFunctionData
//       );
//     } catch (err) {
//       handleError("Error updating critical business function.", err);
//     }
//   };

//   //   Delete a critical business function
//   const deleteCriticalBusinessFunction = async (id, bcpid) => {
//     try {
//       await axiosInstance.delete(
//         `/api/bcpCriticalBusinessFunction/delete/${id}`
//       );
//       await fetchCriticalBusinessFunctionsByBCPID(bcpid);
//     } catch (err) {
//       handleError("Error deleting critical business function.", err);
//     }
//   };

//   // Handle errors
//   const handleError = (message, err) => {
//     console.error(message, err.response?.data || err);
//     errorAlert("Error", message);
//   };

//   return {
//     criticalBusinessFunctions,
//     criticalBusinessFunction,
//     sortedCBFunctions,
//     loading,
//     fetchCriticalBusinessFunctionsByBCPID,
//     fetchCriticalBusinessFunctionsByIds,
//     addCriticalBusinessFunction,
//     updateCriticalBusinessFunction,
//     deleteCriticalBusinessFunction,
//   };
// };
