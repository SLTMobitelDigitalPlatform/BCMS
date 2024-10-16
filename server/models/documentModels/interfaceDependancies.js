const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interfaceSchema = new Schema({
  processName: {
    type: String,
    required: true,
  },
  externalEntityName: { type: Schema.Types.ObjectId, ref: "User" },
  informationExchanged: {
    type: String,
    required: false,
  },
  inwardOutward: {
    type: String,
    required: false,
    enum: ["Inward", "Outward", "Inward/Outward"],
    default: "",
  },
  medium: {
    type: String,
    required: false,
  },
  exchangeMethod: {
    type: String,
    required: true,
  },
  serviceProvidedObtained: {
    type: String,
    required: false,
    enum: ["Provided", "Obtained"],
    default: "",
  },
});

const InterfaceDependancies = mongoose.model(
  "InterfaceDependancies",
  interfaceSchema
);

module.exports = InterfaceDependancies;
