const mongoose = require("mongoose");

const biacriticalBusinessFunctionSchema = new mongoose.Schema({
  biaid: { type: String, required: true },
  functionName: { type: String, required: true },
  description: { type: String, required: true },
  criticality: { type: String, required: true },
  rto: { type: String, required: true },
  rpo: { type: String, required: true },
});

module.exports = mongoose.model(
  "BIACriticalBusinessFunction",
  biacriticalBusinessFunctionSchema
);
