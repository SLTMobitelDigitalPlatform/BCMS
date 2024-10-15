const express = require("express");
const router = new express.Router();
const authControllers = require("../../controllers/userControllers/authController");
const customerController = require("../../controllers/customerController/customerController");

router.get("/customer/getall", customerController.getCustomers);
router.get("/customer/:id", customerController.getCustomerById);
router.post("/customer/register", customerController.createCustomer);
router.delete("/customer/delete", customerController.customerDelete);
router.delete(
  "/customer/deleteByID/:id",
  customerController.deleteCustomerByID
);
router.put("/customer/update/:id", customerController.updateCustomer);

module.exports = router;
