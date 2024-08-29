const express = require("express");
const router = new express.Router();
const authControllers = require("../../controllers/userControllers/authController");
const customerController = require("../../controllers/customerController/customerController");

router.get("/customer/getall", customerController.getCustomers);
router.get("/customer/:id", customerController.getCustomerById);
router.post("/customer/register", customerController.createCustomer);
router.delete("/customer/delete", customerController.customerDelete);

module.exports = router;
