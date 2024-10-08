const mongoose = require("mongoose");

const recoveryResumptionSchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  cbfid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CriticalBusinessFunction",
    required: true,
  },
  number: { type: String, required: true },
  description: { type: String, required: true },
  timing: { type: String, required: true },
  duration: { type: String, required: true },
  role: { type: String, required: true },
  timeOfIncidentActions: { type: String, required: true },
  timeOfIncidentComments: { type: String, required: true },
});

module.exports = mongoose.model("RecoveryResumption", recoveryResumptionSchema);
