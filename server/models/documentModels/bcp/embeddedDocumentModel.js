const mongoose = require("mongoose");

const embeddedDocumentSchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  number: { type: String, required: true },
  description: { type: String, required: true },
  responsiblePerson: { type: String, required: true },
  physicalLocation: { type: String, required: true },
  owner: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmbeddedDocument", embeddedDocumentSchema);
