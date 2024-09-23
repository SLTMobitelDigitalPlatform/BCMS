import React, { useState, useEffect } from "react";
import {
  getTeams,
  deleteTeam,
  updateTeamResponsibilities,
  updateSecondaryTeamMembers,
} from "../../services/teamAPI";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../../services/userAPI";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewTeamModal, setShowViewTeamModal] = useState(false);
  const [showEditMembersModal, setShowEditMembersModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [responsibilities, setResponsibilities] = useState({});
  const [secondaryMembers, setSecondaryMembers] = useState({});
  const [users, setUsers] = useState([]);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("Approved");
  const navigate = useNavigate();

  const fetchTeams = async () => {
    try {
      const response = await getTeams();
      setTeams(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setTeams([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (teamId) => {
    try {
      await deleteTeam(teamId);
      fetchTeams();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const openModal = (team, viewOnly = false) => {
    setSelectedTeam(team);

    const initialResponsibilities = {};
    team.responsibilities.forEach((responsibilityObj) => {
      const memberId = responsibilityObj.memberId._id;
      initialResponsibilities[memberId] =
        responsibilityObj.responsibility || "";
    });

    setResponsibilities(initialResponsibilities);
    setIsViewOnly(viewOnly);
    setShowModal(true);
  };

  const openViewTeamModal = (team) => {
    setSelectedTeam(team);

    const initialSecondaryMembers = {};
    team.teamMembers.forEach((member) => {
      initialSecondaryMembers[member._id] = member.secondaryMember || null;
    });

    setSecondaryMembers(initialSecondaryMembers);
    setShowViewTeamModal(true);
  };

  const openEditMembersModal = (team) => {
    setSelectedTeam(team);

    const initialSecondaryMembers = {};
    team.teamMembers.forEach((member, index) => {
      if (team.secondaryTeamMembers && team.secondaryTeamMembers[index]) {
        initialSecondaryMembers[member._id] =
          team.secondaryTeamMembers[index]._id;
      } else {
        initialSecondaryMembers[member._id] = "";
      }
    });

    setSecondaryMembers(initialSecondaryMembers);
    setShowEditMembersModal(true);
    fetchUsers();
  };

  // const handleResponsibilityChange = (memberId, responsibility) => {
  //   setResponsibilities({ ...responsibilities, [memberId]: responsibility });
  // };

  const handleSecondaryMemberChange = (memberId, secondaryMemberId) => {
    setSecondaryMembers({
      ...secondaryMembers,
      [memberId]: secondaryMemberId,
    });
  };

  // const handleSubmitResponsibilities = async () => {
  //   const updatedResponsibilities = selectedTeam.teamMembers.map((member) => ({
  //     memberId: member._id,
  //     responsibility: responsibilities[member._id],
  //   }));

  //   try {
  //     await updateTeamResponsibilities(
  //       selectedTeam._id,
  //       updatedResponsibilities
  //     );
  //     setShowModal(false);
  //     fetchTeams();
  //   } catch (error) {
  //     console.error("Error updating responsibilities:", error);
  //   }
  // };

  const handleSubmitSecondaryMembers = async () => {
    const updatedTeam = selectedTeam.teamMembers.map((member) => ({
      memberId: member._id,
      secondaryMember: secondaryMembers[member._id],
    }));

    try {
      await updateSecondaryTeamMembers(selectedTeam._id, updatedTeam);
      setShowEditMembersModal(false);
      fetchTeams();
    } catch (error) {
      console.error("Error updating secondary members:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const filteredTeams = (status) => {
    return teams.filter((team) => team.isTeamApproved === status);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Teams</h2>
        <Link
          to="/teams"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Create Team
        </Link>
      </div>

      <div className="mb-4">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "Approved"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("Approved")}
          >
            Approved Teams
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "Not Approved"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("Not Approved")}
          >
            Not Approved Teams
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "Pending" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("Pending")}
          >
            Pending Teams
          </button>
        </div>
      </div>

      {teams.length === 0 ? (
        <p className="text-center text-gray-600">No teams found.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Team Number
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Team Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Team Leader
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Date Created
              </th>
              <th className="text-center py-3 px-4 font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams(
              activeTab === "Approved"
                ? "Approved"
                : activeTab === "Not Approved"
                ? "Not Approved"
                : "Pending"
            ).map((team) => (
              <tr key={team._id} className="border-t">
                <td className="py-3 px-4">{team.teamNo}</td>
                <td className="py-3 px-4">{team.teamName}</td>
                <td className="py-3 px-4">{team.teamLeader.name}</td>
                <td className="py-3 px-4">{formatDate(team.dateCreated)}</td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    onClick={() => handleDelete(team._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    onClick={() => navigate(`/teams/${team._id}`)}
                  >
                    Edit
                  </button>
                  {/* <button
                    className="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-900"
                    onClick={() => openModal(team)}
                  >
                    Add Responsibilities
                  </button> */}
                  <button
                    className="bg-cyan-500 text-white py-1 px-3 rounded hover:bg-cyan-900"
                    onClick={() => openViewTeamModal(team)}
                  >
                    View
                  </button>
                  <button
                    className="bg-purple-500 text-white py-1 px-3 rounded hover:bg-purple-700"
                    onClick={() => openEditMembersModal(team)}
                  >
                    Edit Members
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Existing Responsibilities Modal */}
      {/* {showModal && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              {isViewOnly ? "View" : "Edit"} Responsibilities for{" "}
              {selectedTeam.teamName}
            </h2>

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Team Member
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Responsibility
                  </th>
                </tr>
              </thead>

              <tbody>
                {selectedTeam.teamMembers.map((member) => (
                  <tr key={member._id} className="border-t">
                    <td className="py-3 px-4">{member.name}</td>
                    <td className="py-3 px-4">
                      {isViewOnly ? (
                        <span>{responsibilities[member._id]}</span>
                      ) : (
                        <input
                          type="text"
                          value={responsibilities[member._id] || ""}
                          onChange={(e) =>
                            handleResponsibilityChange(
                              member._id,
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

            {!isViewOnly && (
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={handleSubmitResponsibilities}
                >
                  Submit
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )} */}

      {/* View Team Modal */}
      {showViewTeamModal && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-5xl mx-auto overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-semibold mb-4">
              Team Details for {selectedTeam.teamName}
            </h2>

            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <h3 className="text-xl font-semibold">Team Leader</h3>
                <p>
                  <strong>Name:</strong> {selectedTeam.teamLeader.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedTeam.teamLeader.email}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedTeam.teamLeader.contactNumber}
                </p>
                <p>
                  <strong>Designation:</strong>{" "}
                  {selectedTeam.teamLeader.designation}
                </p>
              </div>

              <div className="w-1/2 pl-2">
                <h3 className="text-xl font-semibold">Secondary Leader</h3>
                {selectedTeam.secondaryLeader ? (
                  <>
                    <p>
                      <strong>Name:</strong> {selectedTeam.secondaryLeader.name}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {selectedTeam.secondaryLeader.email}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {selectedTeam.secondaryLeader.contactNumber}
                    </p>
                    <p>
                      <strong>Designation:</strong>{" "}
                      {selectedTeam.secondaryLeader.designation}
                    </p>
                  </>
                ) : (
                  <p>No secondary leader assigned</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold">Responsibilities</h3>
              <textarea
                value={selectedTeam.teamResponsibilities}
                readOnly
                className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <h3 className="text-xl font-semibold mb-2">Team Members</h3>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Primary Member
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Secondary Member
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedTeam.teamMembers.map((member, index) => (
                  <tr key={member._id} className="border-t">
                    <td className="py-3 px-4">
                      <div>
                        <p>
                          <strong>Name:</strong> {member.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {member.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {member.contactNumber}
                        </p>
                        <p>
                          <strong>Designation:</strong> {member.designation}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {selectedTeam.secondaryTeamMembers &&
                      selectedTeam.secondaryTeamMembers[index] ? (
                        <div>
                          <p>
                            <strong>Name:</strong>{" "}
                            {selectedTeam.secondaryTeamMembers[index].name}
                          </p>
                          <p>
                            <strong>Email:</strong>{" "}
                            {selectedTeam.secondaryTeamMembers[index].email}
                          </p>
                          <p>
                            <strong>Phone:</strong>{" "}
                            {
                              selectedTeam.secondaryTeamMembers[index]
                                .contactNumber
                            }
                          </p>
                          <p>
                            <strong>Designation:</strong>{" "}
                            {
                              selectedTeam.secondaryTeamMembers[index]
                                .designation
                            }
                          </p>
                        </div>
                      ) : (
                        <p>No secondary member assigned</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-4"
              onClick={() => setShowViewTeamModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Members Modal */}
      {showEditMembersModal && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Edit Members for {selectedTeam.teamName}
            </h2>

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Team Member
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Secondary Member
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedTeam.teamMembers.map((member, index) => (
                  <tr key={member._id} className="border-t">
                    <td className="py-3 px-4">
                      <div>
                        <p>
                          <strong>Name:</strong> {member.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {member.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {member.contactNumber}
                        </p>
                        <p>
                          <strong>Designation:</strong> {member.designation}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={secondaryMembers[member._id] || ""}
                        onChange={(e) =>
                          handleSecondaryMemberChange(
                            member._id,
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 border rounded"
                      >
                        <option value="">Select Secondary Member</option>
                        {users.map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleSubmitSecondaryMembers}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
                onClick={() => setShowEditMembersModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamList;
