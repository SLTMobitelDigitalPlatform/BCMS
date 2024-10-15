const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const biaPlanSchema = new Schema(
  {
    biaid: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    template: { type: String, required: true },
    legalEntity: { type: String, required: true },
    approver: { type: String, required: true },
    owner: { type: String, required: true },
    maintainers: [{ type: String, required: true}],
    viewers: [{ type: String, required: true}],
    dateApproved: { type: String, required: true },
    dateLastReviewed: { type: String, required: true },
    dateDueForNextReview: { type: String, required: true },
  },
  { timestamps: true }
);

const biaPlan = mongoose.model("biaPlan", biaPlanSchema);

module.exports = biaPlan;