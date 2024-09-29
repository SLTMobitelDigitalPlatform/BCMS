const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const riskISSchema = new Schema(
  {
    rid: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    responsibility: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    sources: { type: String, required: true },
    assets: { type: String, required: true },
    element: { type: String, required: true },
    objectives: { type: String, required: true },
    controls: { type: String, required: true },
    impact: { type: Number, required: true },
    likelihood: { type: Number, required: true },
    impactRating: { type: Number, required: true },
    treatMethod: { type: String, required: true },
    date: { type: String, required: true },
    newControls: { type: String, required: true },
    residualImpact: { type: Number, required: true },
    probability: { type: Number, required: true },
    residualImpactRating: { type: Number, required: true },
    status: { type: String, required: true },

    newMethod: { type: String, required: false },
    newIdntifiedControls: { type: String, required: false },
    newDate: { type: String, required: false },
    newImpact: { type: Number, required: false },
    newLikelihood: { type: Number, required: false },
    newResidualImpactRating: { type: Number, required: false },
  },
  { timestamps: true }
);

const RiskAssesementIS = mongoose.model("RiskAssesementIS", riskISSchema);

module.exports = RiskAssesementIS;
