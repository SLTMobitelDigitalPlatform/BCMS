const express = require("express");
const router = new express.Router();
const attendeeControllers = require("../../controllers/meetingControllers/AttendeeController");
const authControllers = require("../../controllers/userControllers/authController");

router.post("/createAttendees/:id", attendeeControllers.createAttendees);
router.get(
  "/getSingleAttendee/:meetingId",
  attendeeControllers.getsingleAttendeeData
);

module.exports = router;
