const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orgCallTreeSchema = new Schema({
  title: { type: String, required: false },
  personName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrgCallTree",
    default: null,
  },
  //   section: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Section",
  //     required: false,
  //   },
});

const OrgCallTree = mongoose.model("OrgCallTree", orgCallTreeSchema);
module.exports = OrgCallTree;
