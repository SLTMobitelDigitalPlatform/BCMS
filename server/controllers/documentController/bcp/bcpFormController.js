const BCPForm = require("../../../models/documentModels/bcp/bcpFormModel");
const DocumentControl = require("../../../models/documentModels/bcp/documentControlModel");
const LegalRequirement = require("../../../models/documentModels/bcp/legalRequirementModel");
const EmbeddedDocument = require("../../../models/documentModels/bcp/embeddedDocumentModel");
const PreIncidentPreparation = require("../../../models/documentModels/bcp/preIncidentPreparationModel");
const ResourcesRequired = require("../../../models/documentModels/bcp/resourcesRequiredModel");
const VitalRecords = require("../../../models/documentModels/bcp/vitalRecordsModel");

// Create a new bcp form
exports.createBCPForm = async (req, res) => {
  try {
    const { bcpid } = req.body;

    const existingBCP = await BCPForm.findOne({ bcpid });
    if (existingBCP) {
      return res.status(400).json({ message: "BCP ID already exists" });
    }
    const newBCPForm = new BCPForm(req.body);
    await newBCPForm.save();
    res.status(201).json(newBCPForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bcp forms
exports.getBCPForms = async (req, res) => {
  try {
    const BCPForms = await BCPForm.find();
    res.status(200).json(BCPForms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get last bcp form
exports.getLastbcpForm = async (req, res) => {
  try {
    const { section } = req.params;
    const lastBCPForm = await BCPForm.findOne({
      bcpid: new RegExp(`^BCP-${section}-`),
    }).sort({ _id: -1 });

    res.status(200).json(lastBCPForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bcp form by BCP ID
exports.getbcpFormByBCPID = async (req, res) => {
  const filter = { bcpid: req.params.bcpid };
  try {
    const bcpForm = await BCPForm.findOne(filter);
    if (!bcpForm)
      return res.status(404).json({ message: "BCP Form not found" });
    res.status(200).json(bcpForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single bcp form by ID
exports.getbcpFormById = async (req, res) => {
  try {
    const singleBCPForm = await BCPForm.findById(req.params.id);
    if (!singleBCPForm)
      return res.status(404).json({ message: "BCP Form not found" });
    res.status(200).json(singleBCPForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bcp form by BCP ID
exports.updatebcpFormByBCPID = async (req, res) => {
  const { bcpid } = req.body;
  const oldBCPID = req.params.bcpid;

  try {
    if (bcpid !== oldBCPID) {
      const existingBCP = await BCPForm.findOne({ bcpid });
      if (existingBCP) {
        return res.status(400).json({
          message: "BCP ID already exists. Please choose a different ID.",
        });
      }
    }

    const updatedBCPForm = await BCPForm.findOneAndUpdate(
      { bcpid: oldBCPID },
      req.body,
      { new: true }
    );

    if (!updatedBCPForm)
      return res.status(404).json({ message: "BCP Form not found" });

    if (bcpid !== oldBCPID) {
      const documentModels = [
        DocumentControl,
        LegalRequirement,
        EmbeddedDocument,
        PreIncidentPreparation,
        ResourcesRequired,
        VitalRecords,
      ];

      await Promise.all(
        documentModels.map(async (Model) => {
          await Model.updateMany({ bcpid: oldBCPID }, { $set: { bcpid } });
        })
      );
    }
    res.status(200).json(updatedBCPForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bcpForm by ID
exports.updatebcpForm = async (req, res) => {
  try {
    const updatedBCPForm = await BCPForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBCPForm)
      return res.status(404).json({ message: "BCP Form not found" });
    res.status(200).json(updatedBCPForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a bcpForm by ID
exports.deletebcpForm = async (req, res) => {
  try {
    const deletedBCPForm = await BCPForm.findByIdAndDelete(req.params.id);
    if (!deletedBCPForm)
      return res.status(404).json({ message: "BCP Form not found" });
    res.status(200).json({ message: "BCP Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
