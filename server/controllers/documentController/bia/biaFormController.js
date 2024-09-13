const BiaForm = require("../../../models/documentModels/businessImpactAnalysis/biaFormModel");

// Create a new bia form
const createBiaForm = async (req, res) => {
  try {
    const biaForm = new BiaForm(req.body);
    await biaForm.save();
    res.status(201).json(biaForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bia form
const getBiaForms = async (req, res) => {
  try {
    const biaForm = await BiaForm.find();
    res.status(200).json(biaForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single bia form by ID
const getBiaFormById = async (req, res) => {
  try {
    const biaForm = await BiaForm.findById(req.params.id);
    if (!biaForm)
      return res.status(404).json({ message: "BiaForm not found" });
    res.status(200).json(biaForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a biaForm by ID
const updateBiaForm = async (req, res) => {
  try {
    const biaForm = await BiaForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!biaForm)
      return res.status(404).json({ message: "biaForm not found" });
    res.status(200).json(biaForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a biaForm by ID
const deleteBiaForm = async (req, res) => {
  try {
    const biaForm = await BiaForm.findByIdAndDelete(
      req.params.id
    );
    if (!biaForm)
      return res.status(404).json({ message: "biaForm not found" });
    res.status(200).json({ message: "biaForm deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastBiaForm = async (req, res) => {
  try {
    const lastBiaForm = await BiaForm.findOne().sort({ _id: -1 });

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
