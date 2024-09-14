import axiosInstance from "./axiosInstance";

export const createTeam = async (teamData) => {
  const response = await axiosInstance.post("/team/create", teamData);
  return response;
};

export const getTeams = async () => {
  const response = await axiosInstance.get("/teams");
  return response;
};

export const EditTeam = async (id, updatedData) => {
  const response = await axiosInstance.put(`/team/edit/${id}`, updatedData);
  return response;
};

export const deleteTeam = async (id) => {
  const response = await axiosInstance.delete(`/team/delete/${id}`);
  return response;
};

export const getTeamById = async (id) => {
  const response = await axiosInstance.get(`/team/${id}`);
  return response;
};

export const updateTeamResponsibilities = async (teamId, responsibilities) => {
  const response = await axiosInstance.put(`/team/responsibilities/${teamId}`, {
    responsibilities,
  });
  return response;
};
