const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  teamNo: { type: String, required: true },
  teamName: { type: String, required: true },
  // section: { type: Schema.Types.ObjectId, ref: "Section", required: true },
  teamLeader: { type: Schema.Types.ObjectId, ref: "User", required: true },
  secondaryLeader: { type: Schema.Types.ObjectId, ref: "User" },
  teamMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  secondaryTeamMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dateCreated: { type: Date, default: Date.now },
  isTeamApproved: {
    type: String,
    enum: ["Approved", "Pending", "Not Approved"],
    default: "Pending",
  },
  teamResponsibilities: { type: String, required: false },
  // responsibilities: [
  //   {
  //     memberId: { type: Schema.Types.ObjectId, ref: "User" },
  //     responsibility: String,
  //   },
  // ],
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
