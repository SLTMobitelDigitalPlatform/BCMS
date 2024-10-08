const mongoose = require("mongoose");

const legalRequirementSchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  name: { type: String, required: true },
  legalRequirement: { type: String, required: true },
  monitoredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("LegalRequirement", legalRequirementSchema);
