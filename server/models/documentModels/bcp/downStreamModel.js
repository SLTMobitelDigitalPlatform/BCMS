const mongoose = require("mongoose");

const downstreamSchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  criticalBusinessFunction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CriticalBusinessFunction",
    required: true,
  },
  organization: { type: String, required: true },
  forWhat: { type: String, required: true },
  primaryContact: { type: String, required: true },
  secondaryContact: { type: String, required: true },
  rto: { type: String, required: true },
  justification: { type: String, required: true },
});

module.exports = mongoose.model("Downstream", downstreamSchema);
