const mongoose = require("mongoose");

const documentControlSchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  version: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("DocumentControl", documentControlSchema);
