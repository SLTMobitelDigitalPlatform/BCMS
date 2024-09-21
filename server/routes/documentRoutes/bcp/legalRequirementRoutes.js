const express = require("express");
const {
  createLegalRequirement,
  getAllLegalRequirements,
  getLegalRequirementByBCPID,
  getLastLegalRequirement,
  getLegalRequirementByIds,
  updateLegalRequirement,
  deleteLegalRequirement,
} = require("../../../controllers/documentController/bcp/LegalRequirementController");

const router = express.Router();

router.post("/api/bcpLegalRequirement/add", createLegalRequirement);

router.get("/api/bcpLegalRequirement", getAllLegalRequirements);

router.get("/api/bcpLegalRequirement/:bcpid", getLegalRequirementByBCPID);

router.get("/api/bcpLegalRequirement/:bcpid/:id", getLegalRequirementByIds);

router.get("/api/bcpLegalRequirement/last", getLastLegalRequirement);

router.put("/api/bcpLegalRequirement/edit/:id", updateLegalRequirement);

router.delete("/api/bcpLegalRequirement/delete/:id", deleteLegalRequirement);

module.exports = router;
