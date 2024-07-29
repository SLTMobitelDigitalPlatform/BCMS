const express = require("express");
const { createAboutMe, getAboutMe, deleteAboutMe } = require("../controllers/AboutMeController");
const router = express.Router();

router.post("/createAboutMe", createAboutMe );
router.get("/getAboutMe", getAboutMe );
router.delete("/deleteAboutMe", deleteAboutMe);


module.exports = router;
