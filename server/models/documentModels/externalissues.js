const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const externalSchema = new Schema({
  externalIssues: {
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

const ExternalIssue = mongoose.model("ExternalIssue", externalSchema);

module.exports = ExternalIssue;
