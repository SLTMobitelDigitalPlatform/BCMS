const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const internalPartySchema = new Schema({
  internalParty: { type: String, required: true },
  requirments: { type: String, required: true },
});

const InternalParty = mongoose.model("InternalParty", internalPartySchema);

module.exports = InternalParty;
