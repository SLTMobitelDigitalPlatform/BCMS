const express = require("express");
const teamsController = require("../../controllers/teamsController/teamsController");
const authControllers = require("../../controllers/userControllers/authController");
const router = express.Router();

router.post("/team/create", teamsController.createTeam);

router.get("/teams", teamsController.getAllTeams);
router.get("/team/:id", teamsController.getTeamById);

router.put("/team/edit/:id", teamsController.EditTeam);
router.put(
  "/team/responsibilities/:id",
  teamsController.updateResponsibilities
);
router.delete("/team/delete/:id", teamsController.DeleteTeam);

module.exports = router;
