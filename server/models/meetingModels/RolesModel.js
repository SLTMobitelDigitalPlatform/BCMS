const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    roles: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AboutMe = mongoose.model("Role", RoleSchema);

module.exports = AboutMe;
