import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Meeting API calls
// const meetingAPI = {
//   getMeetings: () => api.get("/getMeetings"),
//   createMeeting: (meetingData) => api.post("/createMeeting", meetingData),
//   deleteMeeting: (id) => api.delete(`/deleteMeeting/${id}`),
//   updateMeeting: (id, updatedData) =>
//     api.put(`/updateMeeting/${id}`, updatedData),
//   getSingleMeeting: (id) => api.get(`/getSingleMeeting/${id}`),
// };

// // User API calls
// const userAPI = {
//   getUsers: () => api.get("/users"),
//   getCurrentUser: (token) =>
//     api.get("/currentuser", { headers: { Authorization: `Bearer ${token}` } }),
//   // api.get("/currentuser", {
//   //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   // }),
//   getUserById: (id) => api.get(`/user/${id}`),
// };

// // Add more APIs like , documentAPI, etc.

// export { meetingAPI, userAPI };
