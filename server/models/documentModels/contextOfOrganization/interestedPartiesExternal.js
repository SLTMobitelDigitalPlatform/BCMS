const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const externalPartySchema = new Schema({
  externalParty: { type: String, required: true },
  requirments: { type: String, required: true },
});

const ExternalParty = mongoose.model("ExternalParty", externalPartySchema);

module.exports = ExternalParty;
