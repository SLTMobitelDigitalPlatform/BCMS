const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const biaFormSchema = new Schema(
  {
    docNo: { type: String, required: true },
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

const biaForm = mongoose.model("biaForm", biaFormSchema);

module.exports = biaForm;