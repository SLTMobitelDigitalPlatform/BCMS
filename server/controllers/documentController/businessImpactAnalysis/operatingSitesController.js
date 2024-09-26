const OperatingSite = require("../../../models/documentModels/businessImpactAnalysis/operatingSites");

// Create a new Operating Site
exports.createOperatingSite = async (req, res) => {
  try {
    const newOperatingSite = new OperatingSite(req.body);
    await newOperatingSite.save();
    res.status(201).json(newOperatingSite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Operating Sites
exports.getAllOperatingSites = async (req, res) => {
  try {
    const documentControls = await OperatingSite.find();
    res.status(200).json(documentControls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Operating Sites by BCP ID
exports.getOperatingSiteByBCPID = async (req, res) => {
  const filter = { bcpid: req.params.bcpid };
  try {
    const documentControls = await OperatingSite.find(filter);
    if (!documentControls) {
      return res.status(404).json({ message: "Document Control not found" });
    }
    res.status(200).json(documentControls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get last Operating Site
exports.getLastOperatingSite = async (req, res) => {
  try {
    const lastOperatingSite = await OperatingSite.findOne().sort({
      _id: -1,
    });
    res.status(200).json(lastOperatingSite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Operating Site by BCP ID and MongoDB ID
exports.getOperatingSiteByIds = async (req, res) => {
  const { bcpid, id } = req.params;
  try {
    const documentControl = await OperatingSite.findOne({ _id: id, bcpid });
    if (!documentControl) {
      return res.status(404).json({ message: "Document Control not found" });
    }
    res.status(200).json(documentControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Operating Site
exports.updateOperatingSite = async (req, res) => {
  try {
    const updatedOperatingSite = await OperatingSite.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOperatingSite) {
      return res.status(404).json({ message: "Document Control not found" });
    }
    res.status(200).json(updatedOperatingSite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Operating Site
exports.deleteOperatingSite = async (req, res) => {
  try {
    const deletedOperatingSite = await OperatingSite.findByIdAndDelete(
      req.params.id
    );
    if (!deletedOperatingSite) {
      return res.status(404).json({ message: "Document Control not found" });
    }
    res.status(200).json({ message: "Document Control deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
