const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const biaDocumentControlSchema = new Schema(
  {
    biaid: { type: String, required: true },
    version: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const biaDocumentControl = mongoose.model("biaDocumentControl", biaDocumentControlSchema);

module.exports = biaDocumentControl;