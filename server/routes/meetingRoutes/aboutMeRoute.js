const express = require("express");
const router = new express.Router();
const aboutMeControllers = require("../../controllers/meetingControllers/AboutMeController");
const authControllers = require("../../controllers/userControllers/authController");

router.post("/createAboutMe", aboutMeControllers.createAboutMe);
router.get("/getAboutMe", aboutMeControllers.getAboutMe);
router.delete("/deleteAboutMe", aboutMeControllers.deleteAboutMe);

module.exports = router;
