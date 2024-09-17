const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BCPFormSchema = new Schema(
  {
    planNo: { type: Number, required: true },
    date: { type: String, required: true },
    template: { type: String, required: true },
    legalEntity: { type: String, required: true },
    approver: { type: String, required: true },
    maintainer: { type: String, required: true },
    viewers: { type: [String], required: true, default:[] },
    dateApproved: { type: Date, required: true},
    dateLastReviewed: { type: Date, required: false },
    dateDueForNextReview: {
      type: Date,
      required: false
    },
  },
  { timestamps: true }
);

const bcpFormSchema = mongoose.model(
  "bcpFormSchema",
  BCPFormSchema
);

module.exports = bcpFormSchema;
