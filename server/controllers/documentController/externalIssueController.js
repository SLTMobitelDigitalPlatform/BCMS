const ExternalIssue = require("../../models/documentModels/externalissues");

const getExternalIssues = async (req, res) => {
  try {
    const externalIssues = await ExternalIssue.find();
    if (!externalIssues) {
      return res.status(404).json({ message: "ExternalIssues not found" });
    }
    res.status(200).json(externalIssues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExternalIssueById = async (req, res) => {
  try {
    const { id } = req.params;
    const externalIssueById = await ExternalIssue.findById(id);
    if (!externalIssueById) {
      return res.status(404).json({ message: "ExternalIssue not found" });
    }
    res.status(200).json(externalIssueById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createExternalIssue = async (req, res) => {
  try {
    const externalIssueToCreate = new ExternalIssue(req.body);
    await externalIssueToCreate.save();
    res.status(200).json(externalIssueToCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExternalIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const externalIssueToUpdate = await ExternalIssue.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!externalIssueToUpdate) {
      return res.status(404).json({ message: "ExternalIssue not found" });
    }
    res.status(200).json(externalIssueToUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExternalIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const externalIssueToDelete = await ExternalIssue.findByIdAndDelete(id);
    if (!externalIssueToDelete) {
      return res.status(404).json({ message: "ExternalIssue not found" });
    }
    res.status(200).json({ message: "External Issue Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExternalIssues,
  getExternalIssueById,
  createExternalIssue,
  updateExternalIssue,
  deleteExternalIssue,
};
