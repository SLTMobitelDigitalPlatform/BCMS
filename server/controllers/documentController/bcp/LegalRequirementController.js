const LegalRequirement = require("../../../models/documentModels/bcp/legalRequirementModel");

// Create a new legal requirement
exports.createLegalRequirement = async (req, res) => {
  try {
    const newLegalRequirement = new LegalRequirement(req.body);
    await newLegalRequirement.save();
    res.status(201).json(newLegalRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all legal requirements
exports.getAllLegalRequirements = async (req, res) => {
  try {
    const legalRequirements = await LegalRequirement.find();
    res.status(200).json(legalRequirements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get last legal requirement
exports.getLastLegalRequirement = async (req, res) => {
  try {
    const lastLegalRequirement = await LegalRequirement.findOne().sort({
      _id: -1,
    });

    res.status(200).json(lastLegalRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all legal requirements  by BCP ID
exports.getLegalRequirementByBCPID = async (req, res) => {
  const filter = { bcpid: req.params.bcpid };
  try {
    const legalRequirements = await LegalRequirement.find(filter);
    if (!legalRequirements) {
      return res.status(404).json({
        message: "Legal, Regulatory and Contractual Requirement not found",
      });
    }
    res.status(200).json(legalRequirements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single legal requirement  by BCP ID and MongoDB ID
exports.getLegalRequirementByIds = async (req, res) => {
  const { bcpid, id } = req.params;
  try {
    const legalRequirement = await LegalRequirement.findOne({ _id: id, bcpid });
    if (!legalRequirement) {
      return res.status(404).json({
        message: "Legal, Regulatory and Contractual Requirement not found",
      });
    }
    res.status(200).json(legalRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a legal requirement
exports.updateLegalRequirement = async (req, res) => {
  try {
    const updatedLegalRequirement = await LegalRequirement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLegalRequirement) {
      return res.status(404).json({
        message: "Legal, Regulatory and Contractual Requirement not found",
      });
    }
    res.status(200).json(updatedLegalRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a legal requirement
exports.deleteLegalRequirement = async (req, res) => {
  try {
    const deletedLegalRequirement = await LegalRequirement.findByIdAndDelete(
      req.params.id
    );
    if (!deletedLegalRequirement) {
      return res.status(404).json({
        message: "Legal, Regulatory and Contractual Requirement not found",
      });
    }
    res.status(200).json({
      message:
        "Legal, Regulatory and Contractual Requirement deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
