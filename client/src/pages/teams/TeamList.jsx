import React, { useState, useEffect } from "react";
import {
  getTeams,
  deleteTeam,
  updateTeamResponsibilities,
} from "../../services/teamAPI";
import { Link, useNavigate } from "react-router-dom";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [responsibilities, setResponsibilities] = useState({});
  const [isViewOnly, setIsViewOnly] = useState(false); // New state to control view-only mode
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
    // Loop through each responsibility object
    team.responsibilities.forEach((responsibilityObj) => {
      const memberId = responsibilityObj.memberId._id; // Access member ID from the memberId object
      initialResponsibilities[memberId] =
        responsibilityObj.responsibility || ""; // Store the responsibility text
    });

    console.log(team);
    setResponsibilities(initialResponsibilities);
    setIsViewOnly(viewOnly); // Set the modal to view-only if true
    setShowModal(true);
  };

  const handleResponsibilityChange = (memberId, responsibility) => {
    setResponsibilities({ ...responsibilities, [memberId]: responsibility });
  };

  const handleSubmit = async () => {
    const updatedResponsibilities = selectedTeam.teamMembers.map((member) => ({
      memberId: member._id,
      responsibility: responsibilities[member._id],
    }));

    try {
      await updateTeamResponsibilities(
        selectedTeam._id,
        updatedResponsibilities
      );
      setShowModal(false);
      fetchTeams();
    } catch (error) {
      console.error("Error updating responsibilities:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  useEffect(() => {
    fetchTeams();
  }, []);

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
      {teams.length === 0 ? (
        <p className="text-center text-gray-600">No teams found.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
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
            {teams.map((team) => (
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
                  <button
                    className="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-900"
                    onClick={() => openModal(team)}
                  >
                    Add Responsibilities
                  </button>
                  <button
                    className="bg-cyan-500 text-white py-1 px-3 rounded hover:bg-cyan-900"
                    onClick={() => openModal(team, true)} // Open in view-only mode
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">
              {isViewOnly
                ? `Responsibilities for ${selectedTeam.teamName}`
                : `Add/Edit Responsibilities for ${selectedTeam.teamName}`}
            </h3>
            <form onSubmit={(e) => e.preventDefault()}>
              {selectedTeam.teamMembers.map((member) => (
                <div key={member._id} className="mb-4">
                  <label className="block font-semibold mb-1">
                    {member.name}
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    value={responsibilities[member._id]} // Pre-filled with previous responsibility value
                    onChange={(e) =>
                      handleResponsibilityChange(member._id, e.target.value)
                    }
                    placeholder={`Enter responsibility for ${member.name}`}
                    readOnly={isViewOnly} // Set read-only if viewing
                  />
                </div>
              ))}

              <div className="flex justify-end space-x-2">
                {!isViewOnly && (
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                )}
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  {isViewOnly ? "Close" : "Cancel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamList;
