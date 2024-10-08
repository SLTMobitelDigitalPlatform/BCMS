const mongoose = require("mongoose");

const biaupstreamSchema = new mongoose.Schema({
  biaid: { type: String, required: true },
  criticalBusinessFunction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BIACriticalBusinessFunction",
    required: true,
  },
  section: { type: String, required: true },
  primaryContact: { type: String, required: true },
  secondaryContact: { type: String, required: true },
  justification: { type: String, required: true },
});

module.exports = mongoose.model("BIAUpstream", biaupstreamSchema);
