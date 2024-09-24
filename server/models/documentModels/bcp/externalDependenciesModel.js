const mongoose = require("mongoose");

const externalDependenciesSchema = new mongoose.Schema({
  businessFunction: { type: String, required: true },
  oraganization: { type: String, required: true },
  dependencies: { type: String, required: true },
  primaryContact: { type: String, required: true },
  secondaryContact: { type: String, required: true },
  justification: { type: String, required: true },
});

module.exports = mongoose.model("ExternalDependencies", externalDependenciesSchema);
