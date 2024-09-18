const mongoose = require("mongoose");

const resourcesRequiredSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  rto: { type: String, required: true },
  justification: { type: String, required: true },
  rpo: { type: String, required: true },
  manualWorkaround: { type: String, required: true },
  operationalDuration: { type: String, required: true },
});

module.exports = mongoose.model("ResourcesRequired", resourcesRequiredSchema);
