const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vControlSchema = new Schema(
  {
    serialNo: { type: Number, required: true },
    versionNo: { type: String, required: true },
    prepare: { type: String, required: true },
    checkedBy: { type: String, required: true },
    approve: { type: String, required: true },
    reasons: { type: String, required: true },
    isChecked: {
      type: String,
      required: false,
      enum: ["Checked", "Not Approved", "Pending"],
      default: "Pending",
    },
    checkedComment: { type: String, required: false },
    isApproved: {
      type: String,
      required: false,
      enum: ["Approved", "Not Approved", "Pending"],
      default: "Pending",
    },
    comment: { type: String, required: false },
  },
  { timestamps: true }
);

const vControl = mongoose.model("vControl", vControlSchema);

module.exports = vControl;
