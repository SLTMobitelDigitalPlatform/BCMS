const express = require("express");
const router = new express.Router();
const actionControllers = require("../../controllers/meetingControllers/ActionController");
const authControllers = require("../../controllers/userControllers/authController");

router.post("/createActions/:id", actionControllers.createActions),
  router.get(
    "/getsingleActionData/:meetingId",
    actionControllers.getsingleActionData
  );

module.exports = router;
