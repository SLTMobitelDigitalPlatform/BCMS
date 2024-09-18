const mongoose = require("mongoose");

const BCPFormSchema = new mongoose.Schema(
  {
    planNo: { type: String, required: true },
    date: { type: String, required: true },
    template: { type: String, required: true },
    legalEntity: { type: String, required: true },
    approver: { type: String, required: true },
    maintainer: { type: String, required: true },
    viewers: { type: [String], required: true, default: [] },
    dateApproved: { type: String, required: true },
    dateLastReviewed: { type: String, required: true },
    dateDueForNextReview: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BCPForm", BCPFormSchema);
