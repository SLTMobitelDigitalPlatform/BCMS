const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vControlRiskSchema = new Schema(
  {
    serialNo: { type: Number, required: true },
    versionNo: { type: String, required: true },
    prepare: { type: Schema.Types.ObjectId, ref: "User" },
    checkedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approve: { type: Schema.Types.ObjectId, ref: "User" },
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

const VersionControlRiskSchema = mongoose.model(
  "VersionControlRiskSchema",
  vControlRiskSchema
);

module.exports = VersionControlRiskSchema;
