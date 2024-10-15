const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendeeSchema = new Schema(
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
    reason: {
      type: String,
      required: false,
    },
    attended: {
      type: String,
      enum: ["Present", "Absent", "Excused"],
    },
  },
  {
    timestamps: true,
  }
);

const Attendee = mongoose.model("Attendee", AttendeeSchema);

module.exports = Attendee;
