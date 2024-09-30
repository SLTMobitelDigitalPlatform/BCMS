const OperatingSite = require("../../../models/documentModels/businessImpactAnalysis/operatingSitesModel");

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
    const operatingSite = await OperatingSite.find();
    res.status(200).json(operatingSite);
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

// Get all Operating Sites  by BIA ID
exports.getOperatingSiteByBIAID = async (req, res) => {
  const filter = { biaid: req.params.biaid };
  try {
    const operatingSite = await OperatingSite.find(filter);
    if (!operatingSite) {
      return res.status(404).json({
        message: "Operating Site not found",
      });
    }
    res.status(200).json(operatingSite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Operating Site by BIA ID and ID
exports.getOperatingSiteByIds = async (req, res) => {
  const { biaid, id } = req.params;
  try {
    const operatingSite = await OperatingSite.findOne({ _id: id, biaid });
    if (!operatingSite) {
      return res.status(404).json({
        message: "Operating Site not found",
      });
    }
    res.status(200).json(operatingSite);
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
      return res.status(404).json({
        message: "Operating Site not found",
      });
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
      return res.status(404).json({
        message: "Operating Site not found",
      });
    }
    res.status(200).json({
      message:
        "Operating Site deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
