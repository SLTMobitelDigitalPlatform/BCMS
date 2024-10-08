const express = require("express");

const {
  createDownstream,
  getDownstreamsByBIAID,
  getDownstreamByIds,
  updateDownstream,
  deleteDownstream,
} = require("../../../controllers/documentController/businessImpactAnalysis/downstreamController");

const router = express.Router();

router.post("/api/biaDownstream/add", createDownstream);

router.get("/api/biaDownstream/:biaid", getDownstreamsByBIAID);

router.get("/api/biaDownstream/:biaid/:id", getDownstreamByIds);

router.put("/api/biaDownstream/edit/:id", updateDownstream);

router.delete("/api/biaDownstream/delete/:id", deleteDownstream);

module.exports = router;
