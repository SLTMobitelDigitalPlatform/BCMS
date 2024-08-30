import axiosInstance from "./axiosInstance";

// fetch single action
export const fetchAction = async (meetingId) => {
  const response = await axiosInstance.get(`/getsingleActionData/${meetingId}`);
  return response;
};

//  create action
export const createAction = async (id, formData) => {
  const response = await axiosInstance.post(`/createActions/${id}`, formData);
  return response;
};

// update action
export const updateAction = async (id, updatedData) => {
  const response = await axiosInstance.put(`/updateActions/${id}`, updatedData);
  return response;
};
