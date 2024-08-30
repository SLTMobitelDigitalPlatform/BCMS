import axiosInstance from "./axiosInstance";

// fetch single attendees
export const fetchAttendee = async (meetingId) => {
  const response = await axiosInstance.get(`/getSingleAttendee/${meetingId}`);
  return response;
};

// create a new attendee
export const createAttendee = async (userId) => {
  const response = await axiosInstance.post(`/createAttendees/${userId}`);
  return response;
};
