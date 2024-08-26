const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const residualRiskSchema = new Schema(
  {
    rid: { type: String, required: true },
    residualRiskRating: { type: Number, required: true },
    treatMethod: { type: String, required: true },
    identifiedControls: { type: String, required: true },
    date: { type: String, required: true },
    impact: { type: Number, required: true },
    likelihood: { type: Number, required: true },
    residualImpactRating: { type: Number, required: true },
  },
  { timestamps: true }
);

const ResidualRiskAssesement = mongoose.model(
  "ResidualRiskAssesement",
  residualRiskSchema
);

module.exports = ResidualRiskAssesement;
