const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const riskSchema = new Schema(
  {
    rid: { type: String, required: true },
    owner: { type: String, required: true },
    responsibility: { type: String, required: true },
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
    statement: { type: String, required: true },
  },
  { timestamps: true }
);

const riskAssesement = mongoose.model("riskAssesement", riskSchema);

module.exports = riskAssesement;
