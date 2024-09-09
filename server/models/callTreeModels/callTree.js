const mongoose = require("mongoose");

const callTreeSchema = new mongoose.Schema({
  label: String,
  mobileNumber: String,
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CallTree",
    },
  ],
});

const CallTree = mongoose.model("CallTree", callTreeSchema);
module.exports = CallTree;
