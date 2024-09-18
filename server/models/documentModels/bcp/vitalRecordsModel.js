const mongoose = require("mongoose");

const vitalRecordsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  options: { type: String, required: true },
  locations: { type: String, required: true },
  thirdPartyContact: { type: String, required: true },
  timeRequired: { type: String, required: true },
  recordRecoveryPoint: { type: String, required: true },
  recoveryStrategy: { type: String, required: true },
});

module.exports = mongoose.model("VitalRecords", vitalRecordsSchema);
