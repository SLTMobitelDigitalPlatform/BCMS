import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/userAPI";
import {
  createTeam,
  EditTeam,
  getLastTeam,
  getTeamById,
} from "../../services/teamAPI";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

const AddEditTeams = ({ fetchTeams }) => {
  const { teamId } = useParams(); // Get teamId from URL
  const isEditing = !!teamId; // Check if editing based on URL

  const [formData, setFormData] = useState({
    teamNo: "",
    teamName: "",
    teamResponsibilities: "",
    teamLeader: "",
    secondaryLeader: "",
    teamMembers: [],
    isTeamApproved: "Pending",
  });

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUsers();
        setUsers(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    const createTeamNo = async () => {
      try {
        const lastTeam = await getLastTeam();
        let lastTeamNo = lastTeam?.data?.teamNo
          ? parseInt(lastTeam.data.teamNo, 10)
          : 0;
        let newTeamNo = (lastTeamNo + 1).toString().padStart(3, "0");
        setFormData((prevData) => ({ ...prevData, teamNo: newTeamNo }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    createTeamNo();

    if (isEditing) {
      const loadTeamData = async () => {
        try {
          const response = await getTeamById(teamId);
          setFormData({
            ...response.data,
            teamLeader: response.data.teamLeader._id,
            secondaryLeader: response.data.secondaryLeader._id,
            teamMembers: response.data.teamMembers.map((member) => member._id),
          });
        } catch (error) {
          console.log(error);
        }
      };
      loadTeamData();
    }
  }, [isEditing, teamId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await EditTeam(teamId, formData);
    } else {
      await createTeam(formData);
    }

    navigate("/teams/teamList");
  };

  return (
    <div className="container mx-auto p-4 h-screen overflow-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditing ? "Edit Team" : "Create a New Team"}
      </h2>
      <div className="overflow-auto h-full mb-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Team Number
            </label>
            <input
              type="text"
              value={formData.teamNo}
              onChange={(e) =>
                setFormData({ ...formData, teamNo: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Team Name</label>
            <input
              type="text"
              value={formData.teamName}
              onChange={(e) =>
                setFormData({ ...formData, teamName: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter team name"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Team Responsibilities
            </label>
            <textarea
              value={formData.teamResponsibilities}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  teamResponsibilities: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Team Leader
            </label>
            <select
              value={formData.teamLeader}
              onChange={(e) =>
                setFormData({ ...formData, teamLeader: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="" disabled>
                Select the Team Leader
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Secondary Team Leader
            </label>
            <select
              value={formData.secondaryLeader}
              onChange={(e) =>
                setFormData({ ...formData, secondaryLeader: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="" disabled>
                Select the Secondary Team Leader
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Team Members
            </label>
            <Select
              isMulti
              options={users.map((user) => ({
                value: user._id,
                label: user.name,
              }))}
              value={formData.teamMembers
                .filter((memberId) =>
                  users.some((user) => user._id === memberId)
                )
                .map((memberId) => {
                  const user = users.find((user) => user._id === memberId);
                  return { value: user._id, label: user.name };
                })}
              onChange={(selectedOptions) =>
                setFormData({
                  ...formData,
                  teamMembers: selectedOptions.map((opt) => opt.value),
                })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.isTeamApproved}
              onChange={(e) =>
                setFormData({ ...formData, isTeamApproved: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Not Approved">Not Approved</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {isEditing ? "Update Team" : "Create Team"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditTeams;
