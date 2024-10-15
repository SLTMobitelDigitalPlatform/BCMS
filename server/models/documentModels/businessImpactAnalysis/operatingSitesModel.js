const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const operatingSitesSchema = new Schema(
  {
    biaid: { type: String, required: true },
    address: { type: String, required: true },
    siteType: { 
        type: String, 
        required: false,
        enum: ["primary", "secondary"],
        default: "" 
    },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const operatingSites = mongoose.model("operatingSites", operatingSitesSchema);

module.exports = operatingSites;