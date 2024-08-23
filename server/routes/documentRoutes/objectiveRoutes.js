const express = require("express");
const router = express.Router();
const objectiveController = require("../../controllers/documentController/objectivesController");
const authControllers = require("../../controllers/userControllers/authController");

router.post("/objective/create", objectiveController.createObjective);

router.get("/objectives", objectiveController.getObjectives);

router.get("/objective/:id", objectiveController.getObjectivesById);

router.put("/objective/edit/:id", objectiveController.editObjective);

router.delete("/objective/delete/:id", objectiveController.deleteObjective);

module.exports = router;
