const InternalIssue = require("../../../models/documentModels/internalIssues");

const getInternalIssues = async (req, res) => {
  try {
    const internalIssues = await InternalIssue.find();
    if (!internalIssues) {
      return res.status(404).json({ message: "ExternalIssues not found" });
    }
    res.status(200).json(internalIssues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInternalIssueById = async (req, res) => {
  try {
    const { id } = req.params;
    const internalIssueById = await InternalIssue.findById(id);
    if (!internalIssueById) {
      return res.status(404).json({ message: "ExternalIssue not found" });
    }
    res.status(200).json(internalIssueById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInternalIssue = async (req, res) => {
  try {
    const internalIssueToCreate = new InternalIssue(req.body);
    await internalIssueToCreate.save();
    res.status(200).json(internalIssueToCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInternalIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const internalIssueToUpdate = await InternalIssue.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!internalIssueToUpdate) {
      return res.status(404).json({ message: "ExternalIssue not found" });
    }
    res.status(200).json(internalIssueToUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInternalIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const internalIssueToDelete = await InternalIssue.findByIdAndDelete(id);
    if (!internalIssueToDelete) {
      return res.status(404).json({ message: "ExternalIssue not found" });
    }
    res.status(200).json({ message: "External Issue Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInternalIssues,
  getInternalIssueById,
  createInternalIssue,
  updateInternalIssue,
  deleteInternalIssue,
};
