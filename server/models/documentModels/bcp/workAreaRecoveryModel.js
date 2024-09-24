const mongoose = require("mongoose");

const workAreaRecoverySchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  site: { type: String, required: true },
  availableFrom: { type: String, required: true },
  availableTo: { type: String, required: true },
  travelDistance: { type: String, required: true },
  travelTime: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

module.exports = mongoose.model("WorkAreaRecovery", workAreaRecoverySchema);
