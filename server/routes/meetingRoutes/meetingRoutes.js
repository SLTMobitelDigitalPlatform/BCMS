const express = require("express");
const router = new express.Router();
const meetingControllers = require("../../controllers/meetingControllers/NewMeetingController");
const authControllers = require("../../controllers/userControllers/authController");

router.get(
  "/getMeetings",

  meetingControllers.getMeetings
);

router.post("/createMeeting", meetingControllers.createMeeting);

router.delete("/deleteMeeting/:id", meetingControllers.deleteMeeting);

router.put("/updateMeeting/:id", meetingControllers.updateMeeting);

router.get("/getSingleMeeting/:id", meetingControllers.getSingleMeeting);

module.exports = router;
