const BiaForm = require("../../../models/documentModels/businessImpactAnalysis/biaFormModel");

// Create a new BIA Plan
const createBiaForm = async (req, res) => {
  try {
    const biaForm = new BiaForm(req.body);
    await biaForm.save();
    res.status(201).json(biaForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all BIA Plans
const getBiaForms = async (req, res) => {
  try {
    const biaForm = await BiaForm.find().lean();
    res.status(200).json(biaForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single BIA Plan
const getBiaFormById = async (req, res) => {
  try {
    const biaForm = await BiaForm.findById(req.params.id).lean();
    if (!biaForm)
      return res.status(404).json({ message: "BIA Plan not found" });
    res.status(200).json(biaForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a BIA Plan
const updateBiaForm = async (req, res) => {
  try {
    const biaForm = await BiaForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!biaForm)
      return res.status(404).json({ message: "BIA Plan not found" });
    res.status(200).json(biaForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a BIA Plan 
const deleteBiaForm = async (req, res) => {
  try {
    const biaForm = await BiaForm.findByIdAndDelete(
      req.params.id
    );
    if (!biaForm)
      return res.status(404).json({ message: "BIA Plan not found" });
    res.status(200).json({ message: "BIA Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a last created BIA Plan
const getLastBiaForm = async (req, res) => {
  try {
    const lastBiaForm = await BiaForm.findOne().sort({ _id: -1 }).lean();

    res.status(200).json(lastBiaForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBiaForm,
  getBiaForms,
  getBiaFormById,
  updateBiaForm,
  deleteBiaForm,
  getLastBiaForm,
};
