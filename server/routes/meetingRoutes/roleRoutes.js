const express = require("express");
const router = new express.Router();
const rolesControllers = require("../../controllers/meetingControllers/RolesController");
const authControllers = require("../../controllers/userControllers/authController");

router.post("/createRole", rolesControllers.createRole);
router.get("/getRole", rolesControllers.getRoles);
router.put("/updateRole", rolesControllers.updateRoles);

module.exports = router;
