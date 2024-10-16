const express = require("express");
const {
  createBCPForm,
  getBCPForms,
  getLastbcpForm,
  getbcpFormByBCPID,
  getbcpFormById,
  updatebcpFormByBCPID,
  updatebcpForm,
  deletebcpForm,
} = require("../../../controllers/documentController/bcp/bcpFormController");

const router = express.Router();

router.post("/api/bcpBCPForm/add", createBCPForm);

router.get("/api/bcpBCPForm/", getBCPForms);

router.get("/api/bcpBCPForm/last/:section", getLastbcpForm);

router.get("/api/bcpBCPForm/:bcpid", getbcpFormByBCPID);

router.get("/api/bcpBCPForm/:id", getbcpFormById);

router.put("/api/bcpBCPForm/edit/:bcpid", updatebcpFormByBCPID);

router.put("/api/bcpBCPForm/edit/:id", updatebcpForm);

router.delete("/api/bcpBCPForm/delete/:id", deletebcpForm);

module.exports = router;
