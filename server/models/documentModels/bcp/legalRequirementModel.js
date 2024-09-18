const mongoose = require("mongoose");

const legalRequirementSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  legalRequirement: { type: String, required: true },
  monitoredBy: { type: String, required: true },
});

module.exports = mongoose.model("LegalRequirement", legalRequirementSchema);
