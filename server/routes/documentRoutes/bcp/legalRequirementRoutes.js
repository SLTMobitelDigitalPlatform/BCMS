const express = require("express");
const {
  createLegalRequirement,
  getAllLegalRequirements,
  getLastLegalRequirement,
  getLegalRequirementById,
  updateLegalRequirement,
  deleteLegalRequirement,
} = require("../../../controllers/documentController/bcp/LegalRequirementController");

const router = express.Router();

router.post("/api/bcpLegalRequirement/add", createLegalRequirement);

router.get("/api/bcpLegalRequirement", getAllLegalRequirements);

router.get("/api/bcpLegalRequirement/last", getLastLegalRequirement);

router.get("/api/bcpLegalRequirement/:id", getLegalRequirementById);

router.put("/api/bcpLegalRequirement/edit/:id", updateLegalRequirement);

router.delete("/api/bcpLegalRequirement/delete/:id", deleteLegalRequirement);

module.exports = router;
