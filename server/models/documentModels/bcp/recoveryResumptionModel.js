const mongoose = require("mongoose");

const recoveryResumptionSchema = new mongoose.Schema({
    description: { type: String, required: true },
  timing: { type: String, required: true },
  duration: { type: String, required: true },
  role: { type: String, required: true },
  timeOfIncidentActions: { type: String, required: true },
  timeOfIncidentComments: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RecoveryResumption", recoveryResumptionSchema);
