const PreIncidentPreparation = require("../../../models/documentModels/bcp/preIncidentPreparationModel");

// Create a new pre-Incident Preparation
exports.createPreIncidentPreparation = async (req, res) => {
  try {
    const newPreIncidentPreparation = new PreIncidentPreparation(req.body);
    await newPreIncidentPreparation.save();
    res.status(201).json(newPreIncidentPreparation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pre-Incident Preparation
exports.getAllPreIncidentPreparation = async (req, res) => {
  try {
    const preIncidentPreparation = await PreIncidentPreparation.find();
    res.status(200).json(preIncidentPreparation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get last pre-Incident Preparation
exports.getLastPreIncidentPreparation = async (req, res) => {
  try {
    const lastPreIncidentPreparation =
      await PreIncidentPreparation.findOne().sort({ _id: -1 });
    res.status(200).json(lastPreIncidentPreparation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single pre-Incident Preparation by ID
exports.getPreIncidentPreparationById = async (req, res) => {
  try {
    const preIncidentPreparation = await PreIncidentPreparation.findById(
      req.params.id
    );
    if (!preIncidentPreparation) {
      return res
        .status(404)
        .json({ message: "Pre-Incident Preparation not found" });
    }
    res.status(200).json(preIncidentPreparation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an pre-Incident Preparation
exports.updatePreIncidentPreparation = async (req, res) => {
  try {
    const updatedPreIncidentPreparation =
      await PreIncidentPreparation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    if (!updatedPreIncidentPreparation) {
      return res
        .status(404)
        .json({ message: "Pre-Incident Preparation not found" });
    }
    res.status(200).json(updatedPreIncidentPreparation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an pre-Incident Preparation
exports.deletePreIncidentPreparation = async (req, res) => {
  try {
    const deletedPreIncidentPreparation =
      await PreIncidentPreparation.findByIdAndDelete(req.params.id);
    if (!deletedPreIncidentPreparation) {
      return res
        .status(404)
        .json({ message: "Pre-Incident Preparation not found" });
    }
    res
      .status(200)
      .json({ message: "Pre-Incident Preparation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
