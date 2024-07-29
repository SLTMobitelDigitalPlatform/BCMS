const express = require("express");
const { getEmployees, getEmployeeByID } = require("../controllers/EmployeeController");
const router = express.Router();

router.get("/getEmployees", getEmployees ),
router.get("/getEmployeesById/:id", getEmployeeByID)


module.exports = router;
