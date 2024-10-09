const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const policySchema = new Schema({
  cINumber: { type: String, required: false },
  contactInquiriesPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  dPNumber: { type: String, required: false },
  documentPrepPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  cCNumber: { type: String, required: false },
  controlledCirculationPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  iRNumber: { type: String, required: false },
  issueNumber: { type: String, required: false },
  issueDate: { type: Date, default: "" },
  riviseNumber: { type: String, required: false },
  rivisedDate: { type: Date, default: "" },
  rivisedDescription: { type: String, required: false },
  intoduction: { type: String },
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;
