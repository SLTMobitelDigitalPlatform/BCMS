const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sectionCoordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    sectionCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
