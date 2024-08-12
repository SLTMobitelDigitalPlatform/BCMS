const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetingActionSchema = new Schema(
  {
    meetingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
    },
    attendeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actionNo: {
      type: Number,
      required: false,
    },
    action: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    targetDate: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Opened"],
    },
    comment: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const MeetingAction = mongoose.model("MeetingAction", MeetingActionSchema);

module.exports = MeetingAction;
