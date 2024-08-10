const Attendee = require("../../models/meetingModels/AttendeeModel");

// create attendees for a specific meeting
const createAttendees = async (req, res) => {
  const { id } = req.params;
  const attendeesDetails = req.body;

  try {
    for (const detail of attendeesDetails) {
      const newAttendee = new Attendee({
        meetingId: id,
        attendeeId: detail.attendeeId,
        reason: detail.reason,
        attended: detail.attended,
      });

      await newAttendee.save();
    }

    res.status(201).json({ message: "Attendee details stored successfully" });
  } catch (error) {
    console.error("Error storing Attendee details:", error);
    res
      .status(500)
      .json({ message: "Failed to store Attendee details", error });
  }
};

// get attendee data for single meeting
const getsingleAttendeeData = (req, res) => {
  Attendee.find({ meetingId: req.params.meetingId })
    .populate("attendeeId")
    .then((attendees) => res.json(attendees))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  createAttendees,
  getsingleAttendeeData,
};
