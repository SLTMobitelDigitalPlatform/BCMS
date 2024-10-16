const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proceduresSchema = new Schema(
  {
    processNo: {
      type: Number,
      required: true,
    },
    processName: {
      type: String,
      required: true,
    },
    processKpi: { type: String, required: true },
    responsiblePerson: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ProceduresAndProcess = mongoose.model(
  "ProceduresAndProcess",
  proceduresSchema
);

module.exports = ProceduresAndProcess;
