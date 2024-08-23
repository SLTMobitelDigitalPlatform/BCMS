const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const internalSchema = new Schema({
  internalIssues: {
    type: String,
    required: true,
  },
  requirments: {
    type: String,
    required: true,
  },
  isms: {
    type: Boolean,
    required: false,
  },
  qms: {
    type: Boolean,
    required: false,
  },
  bcms: {
    type: Boolean,
    required: false,
  },
});

const InternalIssue = mongoose.model("InternalIssue", internalSchema);

module.exports = InternalIssue;
