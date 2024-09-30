const mongoose = require("mongoose");

const externalDependenciesSchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  criticalBusinessFunction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CriticalBusinessFunction",
    required: true,
  },
  organization: { type: String, required: true },
  dependencies: { type: String, required: true },
  primaryContact: { type: String, required: true },
  secondaryContact: { type: String, required: true },
  justification: { type: String, required: true },
});

module.exports = mongoose.model(
  "ExternalDependencies",
  externalDependenciesSchema
);
