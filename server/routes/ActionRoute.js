const express = require("express");
const { createActions, getsingleActionData } = require("../controllers/ActionController,js");
const router = express.Router();


router.post("/createActions/:id", createActions),
router.get("/getsingleActionData/:meetingId", getsingleActionData)

module.exports = router;