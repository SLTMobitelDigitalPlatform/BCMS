import axiosInstance from "./axiosInstance";

// Get all meetings
export const getAllMeetings = async () => {
  const response = await axiosInstance.get("/getMeetings");
  return response;
};

// Get single meeting
export const getSingleMeeting = async (meetingId) => {
  const response = await axiosInstance.get(`/getSingleMeeting/${meetingId}`);
  return response;
};

// create a new meeting
export const createMeeting = async (meetingData) => {
  const response = await axiosInstance.post("/createMeeting", meetingData);
  return response;
};

// Delete meeting
export const deleteMeeting = async (meetingId) => {
  const response = await axiosInstance.delete(`/deleteMeeting/${meetingId}`);
  return response;
};

// Update meeting
export const updateMeeting = async (meetingId, updatedData) => {
  const response = await axiosInstance.put(
    `/updateMeeting/${meetingId}`,
    updatedData
  );
  return response;
};
