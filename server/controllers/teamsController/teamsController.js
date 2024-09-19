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
      "teamLeader secondaryLeader teamMembers secondaryTeamMembers section responsibilities.memberId"
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
      "teamLeader secondaryLeader teamMembers secondaryTeamMembers section responsibilities.memberId"
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
    }).populate(
      "teamLeader secondaryLeader teamMembers secondaryTeamMembers section responsibilities.memberId"
    );
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

const getLastTeam = async (req, res) => {
  try {
    const lastTeam = await Team.findOne().sort({ _id: -1 });
    res.status(200).json(lastTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSecondaryTeamMembers = async (req, res) => {
  try {
    const { id: teamId } = req.params; // Extract teamId correctly
    const secondaryMembersArray = req.body; // Request body contains an array of objects

    // console.log(teamId);
    // console.log(secondaryMembersArray);
    // console.log(req.params);
    // console.log(req.body);

    // Validate that secondaryMembersArray is provided and is an array
    if (!secondaryMembersArray || !Array.isArray(secondaryMembersArray)) {
      return res
        .status(400)
        .json({ message: "Invalid secondary team members provided" });
    }

    // Extract only the secondaryMember field from each object
    const secondaryTeamMembers = secondaryMembersArray.map(
      (item) => item.secondaryMember
    );

    // Validate the result
    if (secondaryTeamMembers.length === 0) {
      return res
        .status(400)
        .json({ message: "No secondary team members found" });
    }

    console.log(secondaryTeamMembers);

    // Find the team by ID and update the secondaryTeamMembers field
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { secondaryTeamMembers }, // Update the correct field
      { new: true } // Return the updated document
    ).populate(
      "teamLeader secondaryLeader teamMembers secondaryTeamMembers section responsibilities.memberId"
    );

    // If the team is not found, return a 404 error
    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Respond with the updated team
    res.status(200).json(updatedTeam);
  } catch (error) {
    // Handle any errors and return a 500 response
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
  getLastTeam,
  updateSecondaryTeamMembers,
};
