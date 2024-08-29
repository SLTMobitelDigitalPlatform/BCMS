const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vControlRiskSchema = new Schema(
  {
    serialNo: { type: Number, required: true },
    versionNo: { type: String, required: true },
    prepare: { type: String, required: true },
    approve: { type: String, required: true },
    reasons: { type: String, required: true },
    isApproved: {
      type: String,
      required: false,
      enum: ["Approved", "Not Approved", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const VersionControlRiskSchema = mongoose.model(
  "VersionControlRiskSchema",
  vControlRiskSchema
);

module.exports = VersionControlRiskSchema;
