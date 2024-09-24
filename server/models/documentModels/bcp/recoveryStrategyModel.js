const mongoose = require("mongoose");

const recoveryStrategySchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  primaryOperatingSite: { type: String, required: true },
  relocateTo: { type: String, required: true },
  outsourceOptions: { type: String, required: true },
});

module.exports = mongoose.model("RecoveryStrategy", recoveryStrategySchema);
