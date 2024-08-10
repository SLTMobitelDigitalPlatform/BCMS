const RiskAssessment = require("../../models/documentModels/riskAssesementModel");

// Create a new risk assessment
const createRisk = async (req, res) => {
  try {
    const risk = new RiskAssessment(req.body);
    await risk.save();
    res.status(201).json(risk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all risk assessments
const getRisks = async (req, res) => {
  try {
    const risks = await RiskAssessment.find();
    res.status(200).json(risks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single risk assessment by ID
const getRiskById = async (req, res) => {
  try {
    const risk = await RiskAssessment.findById(req.params.id);
    if (!risk) return res.status(404).json({ message: "Risk not found" });
    res.status(200).json(risk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a risk assessment by ID
const updateRisk = async (req, res) => {
  try {
    const risk = await RiskAssessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!risk) return res.status(404).json({ message: "Risk not found" });
    res.status(200).json(risk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a risk assessment by ID
const deleteRisk = async (req, res) => {
  try {
    const risk = await RiskAssessment.findByIdAndDelete(req.params.id);
    if (!risk) return res.status(404).json({ message: "Risk not found" });
    res.status(200).json({ message: "Risk deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRisk,
  getRisks,
  getRiskById,
  updateRisk,
  deleteRisk,
};
