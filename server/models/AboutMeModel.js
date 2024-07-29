const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutMeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    serviceNo: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    country: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      section: {
        type: String,
        required: true,
      },
      officialEmail: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const AboutMe = mongoose.model("AboutMe", AboutMeSchema);

module.exports = AboutMe;
