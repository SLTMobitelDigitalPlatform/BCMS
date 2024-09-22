const mongoose = require("mongoose");

const criticalBusinessFunctionSchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  criticality: { type: String, required: true },
  rto: { type: String, required: true },
});

module.exports = mongoose.model(
  "CriticalBusinessFunction",
  criticalBusinessFunctionSchema
);
