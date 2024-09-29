const QualityManagement = require("../../../models/documentModels/qualityManagement");

// Create a new risk assessment
const createRisk = async (req, res) => {
  try {
    const risk = new QualityManagement(req.body);
    await risk.save();
    res.status(201).json(risk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all risk assessments
const getRisks = async (req, res) => {
  try {
    const risks = await QualityManagement.find()
      .populate("owner")
      .populate("responsibility");
    res.status(200).json(risks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single risk assessment by ID
const getRiskById = async (req, res) => {
  try {
    const risk = await QualityManagement.findById(req.params.id)
      .populate("owner")
      .populate("responsibility");
    if (!risk) return res.status(404).json({ message: "Risk not found" });
    res.status(200).json(risk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a risk assessment by ID
const updateRisk = async (req, res) => {
  try {
    const risk = await QualityManagement.findByIdAndUpdate(
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
    const risk = await QualityManagement.findByIdAndDelete(req.params.id);
    if (!risk) return res.status(404).json({ message: "Risk not found" });
    res.status(200).json({ message: "Risk deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastRisk = async (req, res) => {
  try {
    const { section } = req.params;
    // const lastRisk = await RiskAssessment.findOne().sort({ _id: -1 });
    const lastRisk = await QualityManagement.findOne({
      rid: new RegExp(`^QMR-${section}-`),
    }).sort({ _id: -1 });
    // console.log(lastRisk);
    res.status(200).json(lastRisk);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createRisk,
  getRisks,
  getLastRisk,
  getRiskById,
  updateRisk,
  deleteRisk,
};
