const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const callTreeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  personName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  mobileNumber: { type: String, required: false },
  image: { type: String },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CallTree",
    default: null,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: false,
  },
});

const CallTree = mongoose.model("CallTree", callTreeSchema);
module.exports = CallTree;
