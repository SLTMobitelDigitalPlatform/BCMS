const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vControlSchema = new Schema(
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

const vControl = mongoose.model("vControl", vControlSchema);

module.exports = vControl;
