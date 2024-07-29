const express = require("express");
const { createAttendees, getsingleAttendeeData } = require("../controllers/AttendeeController");
const router = express.Router();


router.post("/createAttendees/:id", createAttendees)
router.get("/getSingleAttendee/:meetingId", getsingleAttendeeData )

module.exports = router;