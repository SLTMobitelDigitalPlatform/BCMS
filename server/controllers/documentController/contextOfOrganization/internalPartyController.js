const InternalParty = require("../../../models/documentModels/contextOfOrganization/interestedPartiesInternal");

const getInternalParty = async (req, res) => {
  try {
    const internalParty = await InternalParty.find();
    if (!internalParty) {
      return res.status(404).json({ message: "ExternalIssues not found" });
    }
    res.status(200).json(internalParty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInternalPartyById = async (req, res) => {
  try {
    const { id } = req.params;
    const internalPartyById = await InternalParty.findById(id);
    if (!internalPartyById) {
      return res.status(404).json({ message: "ExternalIssue not found" });
    }
    res.status(200).json(internalPartyById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInternalParty = async (req, res) => {
  try {
    const internalPartyToCreate = new InternalParty(req.body);
    await internalPartyToCreate.save();
    res.status(200).json(internalPartyToCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInternalParty = async (req, res) => {
  try {
    const { id } = req.params;
    const internalPartyToUpdate = await InternalParty.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!internalPartyToUpdate) {
      return res.status(404).json({ message: "ExternalIssue not found" });
    }
    res.status(200).json(internalPartyToUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInternalParty = async (req, res) => {
  try {
    const { id } = req.params;
    const internalPartyToDelete = await InternalParty.findByIdAndDelete(id);
    if (!internalPartyToDelete) {
      return res.status(404).json({ message: "Internal Party not found" });
    }
    res.status(200).json({ message: "Internal Party Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInternalParty,
  getInternalPartyById,
  createInternalParty,
  updateInternalParty,
  deleteInternalParty,
};
