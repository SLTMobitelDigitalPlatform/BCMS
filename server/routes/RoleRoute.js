const express = require("express");
const { createRole, getRoles, updateRoles } = require("../controllers/RolesController");
const router = express.Router();

router.post("/createRole", createRole);
router.get("/getRole", getRoles);
router.put("/updateRole", updateRoles);


module.exports = router;
