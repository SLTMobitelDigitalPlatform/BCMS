const mongoose = require("mongoose");

const BCPFormSchema = new mongoose.Schema(
  {
    bcpid: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    section: { type: String, required: true },
    year: { type: String, required: true },
    template: { type: String, required: true },
    legalEntity: { type: String, required: true },
    approver: { type: String, required: true },
    owner: { type: String, required: true },
    maintainer: { type: String, required: true },
    viewers: { type: [String], required: true },
    dateApproved: { type: String, required: true },
    dateLastReviewed: { type: String, required: true },
    dateDueForNextReview: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BCPForm", BCPFormSchema);
