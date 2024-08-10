const express = require("express");

const router = new express.Router();
const homeControllers = require("../../controllers/homeController/homeController");
const authControllers = require("../../controllers/userControllers/authController");

// Route to get all descriptions
router.get("/getDescriptions", homeControllers.getDescriptions);

// Route to get a single description by ID
router.get("/getDescriptions/:id", homeControllers.getDescriptionById);

// Route to create a new description with an uploaded image
router.post(
  "/createDescription",
  homeControllers.upload.single("image"),
  homeControllers.createDescription
);

// Route to upload a cover image
router.post(
  "/uploadCoverImage",
  homeControllers.setCoverImageFlag,
  homeControllers.upload.single("coverImage"),
  homeControllers.uploadCoverImage
);

// Route to delete a description by ID
router.delete("/deleteDescription/:id", homeControllers.deleteDescription);

// Route to get cover images
router.get("/getCoverImages", homeControllers.getCoverImages); // Add this route

module.exports = router;
