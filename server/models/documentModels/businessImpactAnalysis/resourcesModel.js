const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourcesSchema = new Schema(
  {
    biaid: { type: String, required: true },
    resourceName: { type: String, required: true },
    quantity: { type: Number, required: true },
    RTO: { type: String, required: true },
    RPO: { type: String, required: true },
  },
  { timestamps: true }
);

const resources = mongoose.model("resources", resourcesSchema);

module.exports = resources;