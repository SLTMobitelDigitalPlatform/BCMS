const Employee = require("../models/EmployeeModel");

// Get all employees
const getEmployees = (req, res) => {
  Employee.find()
    .then((Employee) => res.status(200).json(Employee))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

// Get employee by ID
 const getEmployeeByID = (req, res) => {
  Employee.findById(req.params.id)
   .then((employee) => res.status(200).json(employee))
   .catch((err) => {
      res.status(400).json({ message: err });
    });
 }

module.exports = {
    getEmployees,
    getEmployeeByID
};