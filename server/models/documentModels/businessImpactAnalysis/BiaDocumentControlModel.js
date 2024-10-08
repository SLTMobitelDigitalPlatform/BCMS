const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BiaDocumentControlSchema = new Schema(
  {
    biaid: { type: String, required: true },
    version: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const BiaDocumentControl = mongoose.model("BiaDocumentControl", BiaDocumentControlSchema);

module.exports = BiaDocumentControl;