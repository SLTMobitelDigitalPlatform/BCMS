const express = require("express");

const {
  createUpstream,
  getUpstreamsByBIAID,
  getUpstreamByIds,
  updateUpstream,
  deleteUpstream,
} = require("../../../controllers/documentController/businessImpactAnalysis/upstreamController");

const router = express.Router();

router.post("/api/biaUpstream/add", createUpstream);

router.get("/api/biaUpstream/:biaid", getUpstreamsByBIAID);

router.get("/api/biaUpstream/:biaid/:id", getUpstreamByIds);

router.put("/api/biaUpstream/edit/:id", updateUpstream);

router.delete("/api/biaUpstream/delete/:id", deleteUpstream);

module.exports = router;
