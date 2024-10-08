const mongoose = require("mongoose");

const biaExternalDependenciesSchema = new mongoose.Schema({
  biaid: { type: String, required: true },
  criticalBusinessFunction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BIACriticalBusinessFunction",
    required: true,
  },
  organization: { type: String, required: true },
  dependencies: { type: String, required: true },
  primaryContact: { type: String, required: true },
  secondaryContact: { type: String, required: true },
  justification: { type: String, required: true },
});

module.exports = mongoose.model(
  "BIAExternalDependencies",
  biaExternalDependenciesSchema
);
