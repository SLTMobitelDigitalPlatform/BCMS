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

// const residualRiskSchema = new Schema(
//   {
//     rid: { type: String, required: true },
//     residualImpactRating: { type: Number, required: true },
//     newTreatMethod: { type: String, required: true },
//     newIdentifiedControls: { type: String, required: true },
//     newDate: { type: String, required: true },
//     newImpact: { type: Number, required: true },
//     newLikelihood: { type: Number, required: true },
//     newResidualRiskRating: { type: Number, required: true },
//   },
//   { timestamps: true }
// );
