const ExternalParty = require("../../../models/documentModels/contextOfOrganization/interestedPartiesExternal");

const getExternalParty = async (req, res) => {
  try {
    const externalParty = await ExternalParty.find();
    if (!externalParty) {
      return res.status(404).json({ message: "ExternalIssues not found" });
    }
    res.status(200).json(externalParty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExternalPartyById = async (req, res) => {
  try {
    const { id } = req.params;
    const externalPartyById = await ExternalParty.findById(id);
    if (!externalPartyById) {
      return res.status(404).json({ message: "ExternalIssue not found" });
    }
    res.status(200).json(externalPartyById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createExternalParty = async (req, res) => {
  try {
    const externalPartyToCreate = new ExternalParty(req.body);
    await externalPartyToCreate.save();
    res.status(200).json(externalPartyToCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExternalParty = async (req, res) => {
  try {
    const { id } = req.params;
    const externalPartyToUpdate = await ExternalParty.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!externalPartyToUpdate) {
      return res.status(404).json({ message: "ExternalIssue not found" });
    }
    res.status(200).json(externalPartyToUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExternalParty = async (req, res) => {
  try {
    const { id } = req.params;
    const externalPartyToDelete = await ExternalParty.findByIdAndDelete(id);
    if (!externalPartyToDelete) {
      return res.status(404).json({ message: "ExternalIssue not found" });
    }
    res.status(200).json({ message: "External Party Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExternalParty,
  getExternalPartyById,
  createExternalParty,
  updateExternalParty,
  deleteExternalParty,
};
