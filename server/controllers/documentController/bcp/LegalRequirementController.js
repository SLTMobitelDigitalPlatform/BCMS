const LegalRequirement = require("../../../models/documentModels/bcp/legalRequirementModel");

// Create a new embedded document
exports.createLegalRequirement = async (req, res) => {
  try {
    const newLegalRequirement = new LegalRequirement(req.body);
    await newLegalRequirement.save();
    res.status(201).json(newLegalRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all embedded documents
exports.getAllLegalRequirements = async (req, res) => {
  try {
    const legalRequirements = await LegalRequirement.find();
    res.status(200).json(legalRequirements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get last embedded document
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

// Get a single embedded document by ID
exports.getLegalRequirementById = async (req, res) => {
  try {
    const embeddedDocument = await LegalRequirement.findById(req.params.id);
    if (!embeddedDocument) {
      return res.status(404).json({ message: "Legal Regulatory and Contractual Requirement not found" });
    }
    res.status(200).json(embeddedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an embedded document
exports.updateLegalRequirement = async (req, res) => {
  try {
    const updatedLegalRequirement = await LegalRequirement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLegalRequirement) {
      return res.status(404).json({ message: "Legal Regulatory and Contractual Requirement not found" });
    }
    res.status(200).json(updatedLegalRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an embedded document
exports.deleteLegalRequirement = async (req, res) => {
  try {
    const deletedLegalRequirement = await LegalRequirement.findByIdAndDelete(
      req.params.id
    );
    if (!deletedLegalRequirement) {
      return res.status(404).json({ message: "Legal Regulatory and Contractual Requirement not found" });
    }
    res.status(200).json({ message: "Legal Regulatory and Contractual Requirement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
