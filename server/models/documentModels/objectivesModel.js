const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const objectiveschema = new Schema(
  {
    informationSecurity: {
      type: String,
      required: true,
    },
    businessContinuity: {
      type: String,
      required: true,
    },
    quality: { type: String, required: true },
  },
  { timestamps: true }
);

const Objective = mongoose.model("Objective", objectiveschema);

module.exports = Objective;
