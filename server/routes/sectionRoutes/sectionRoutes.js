const express = require("express");
const sectionController = require("../../controllers/sectionControllers/sectionController");
const authControllers = require("../../controllers/userControllers/authController");
const router = express.Router();

router.post("/api/section/create", sectionController.createSection);

router.get("/api/sections", sectionController.getSections);
router.get("/api/section/:id", sectionController.getSectionById);

router.put("/api/section/edit/:id", sectionController.editSection);
router.delete("/api/section/delete/:id", sectionController.deleteSection);

module.exports = router;
