const mongoose = require("mongoose");

const relatedDocumentsSchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  referenceDocument: { type: String, required: true },
  documentType: { type: String, required: true },
});

module.exports = mongoose.model("RelatedDocuments", relatedDocumentsSchema);
