const Team = require("../../models/teamsModel/team");

const createTeam = async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate(
      "teamLeader teamMembers section responsibilities.memberId"
    );
    if (!teams) return res.status(404).json({ message: "Teams not found" });
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate(
      "teamLeader teamMembers section responsibilities.memberId"
    );
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const EditTeam = async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("teamLeader teamMembers section responsibilities.memberId");
    if (!updatedTeam)
      return res.status(404).json({ message: "Team not found" });
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam)
      return res.status(404).json({ message: "Team not found" });
    res.status(200).json({ message: "Team Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateResponsibilities = async (req, res) => {
  try {
    const { responsibilities } = req.body;
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Update responsibilities for each team member
    team.responsibilities = responsibilities;

    const updatedTeam = await team.save();
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  EditTeam,
  DeleteTeam,
  updateResponsibilities,
};
