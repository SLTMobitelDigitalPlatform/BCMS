const mongoose = require("mongoose");

const manpowerSchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  option: { type: String, required: true },
  tableData: { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model("Manpower", manpowerSchema);
