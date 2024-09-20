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

export const updateSecondaryTeamMembers = async (teamId, updatedTeam) => {
  const response = await axiosInstance.put(
    `/team/secondary/${teamId}`,
    updatedTeam
  );
  return response;
};

export const getLastTeam = async () => {
  try {
    const response = await axiosInstance.get("/teams/last");
    return response;
  } catch (error) {
    console.error("Error fetching the last team:", error);
    throw error;
  }
};
