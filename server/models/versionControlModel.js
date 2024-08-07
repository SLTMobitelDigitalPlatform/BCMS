const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vControlSchema = new Schema(
  {
    serialNo: { type: Number, required: true },
    versionNo: { type: Number, required: true },
    prepare: { type: String, required: true },
    approve: { type: String, required: true },
    reasons: { type: String, required: true },
  },
  { timestamps: true }
);

const vControl = mongoose.model("vControl", vControlSchema);

module.exports = vControl;
