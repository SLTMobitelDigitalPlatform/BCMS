const mongoose = require("mongoose");

const manpowerSchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  option: { type: String, enum: ["option1", "option2"], required: true },
  tableData: {
    headers: [String],
    rows: [
      {
        rowName: String,
        values: [Number],
      },
    ],
  },
});

module.exports = mongoose.model("Manpower", manpowerSchema);
