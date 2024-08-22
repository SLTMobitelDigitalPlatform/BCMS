const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const objectiveschema = new Schema(
  {
    serialNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vControl",
      required: true,
    },
    versionNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vControl",
      required: true,
    },
    preparedBy: { type: String, required: true },
  },
  { timestamps: true }
);

const Objectives = mongoose.model("Objectives", objectiveschema);

module.exports = Objectives;
