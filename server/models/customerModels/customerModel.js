const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not Valid Email");
      }
    },
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  province: String,
  company: String,
  subPreference: {
    type: [String],
  },
});

const Customer = new mongoose.model("Customer", customerSchema);
module.exports = Customer;
