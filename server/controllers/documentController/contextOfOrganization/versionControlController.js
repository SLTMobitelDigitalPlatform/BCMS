const vControl = require("../../../models/documentModels/versionControlModel");

// Create a new version control
const createVersionControl = async (req, res) => {
  try {
    const versionControl = new vControl(req.body);
    await versionControl.save();
    res.status(201).json(versionControl);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all version control
const getVersionControls = async (req, res) => {
  try {
    const versionControl = await vControl
      .find()
      .populate("prepare")
      .populate("checkedBy")
      .populate("approve");
    res.status(200).json(versionControl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single version control by ID
const getVersionById = async (req, res) => {
  try {
    const versionControl = await vControl.findById(req.params.id);
    if (!versionControl)
      return res.status(404).json({ message: "VersionControl not found" });
    res.status(200).json(versionControl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a versionControl by ID
const updateVersion = async (req, res) => {
  try {
    const versionControl = await vControl.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!versionControl)
      return res.status(404).json({ message: "versionControl not found" });
    res.status(200).json(versionControl);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a versionControl by ID
const deleteVersion = async (req, res) => {
  try {
    const versionControl = await vControl.findByIdAndDelete(req.params.id);
    if (!versionControl)
      return res.status(404).json({ message: "versionControl not found" });
    res.status(200).json({ message: "versionControl deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastVersion = async (req, res) => {
  try {
    const lastVersion = await vControl.findOne().sort({ _id: -1 });

    res.status(200).json(lastVersion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVersionControl,
  getVersionControls,
  getVersionById,
  updateVersion,
  deleteVersion,
  getLastVersion,
};
