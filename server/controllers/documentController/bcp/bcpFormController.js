const bcpForm = require("../../../models/documentModels/bcp/bcpFormModel");

// Create a new bcp form
const createBCPForm = async (req, res) => {
  try {
    const bcpForm = new bcpForm(req.body);
    await bcpForm.save();
    res.status(201).json(bcpForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bcp forms
const getBCPForms = async (req, res) => {
  try {
    const bcpForm = await bcpForm.find();
    res.status(200).json(bcpForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single bcp form by ID
const getbcpFormById = async (req, res) => {
  try {
    const bcpForm = await bcpForm.findById(req.params.id);
    if (!bcpForm)
      return res.status(404).json({ message: "BCP Form not found" });
    res.status(200).json(bcpForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bcpForm by ID
const updatebcpForm= async (req, res) => {
  try {
    const bcpForm = await bcpForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!bcpForm)
      return res.status(404).json({ message: "BCP Form not found" });
    res.status(200).json(bcpForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bcpForm by ID
const deletebcpForm = async (req, res) => {
  try {
    const bcpForm = await bcpForm.findByIdAndDelete(
      req.params.id
    );
    if (!bcpForm)
      return res.status(404).json({ message: "BCP Form not found" });
    res.status(200).json({ message: "BCP Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastbcpForm = async (req, res) => {
  try {
    const lastbcpForm = await bcpForm.findOne().sort({ _id: -1 });

    res.status(200).json(lastbcpForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBCPForm,
  getBCPForms,
  getbcpFormById,
  updatebcpForm,
  deletebcpForm,
  getLastbcpForm,
};
