const express = require("express");
const {
  createPeaksDeadline,
  getAllPeaksDeadlines,
  getPeaksDeadlineByBIAID,
  getLastPeaksDeadline,
  getPeaksDeadlineByIds,
  updatePeaksDeadline,
  deletePeaksDeadline,
} = require("../../../controllers/documentController/businessImpactAnalysis/peaksDeadlinesController");

const router = express.Router();

router.post("/api/biaPeaksDeadline/add", createPeaksDeadline);

router.get("/api/biaPeaksDeadline", getAllPeaksDeadlines);

router.get("/api/biaPeaksDeadline/:biaid", getPeaksDeadlineByBIAID);

router.get("/api/biaPeaksDeadline/:biaid/:id", getPeaksDeadlineByIds);

router.get("/api/biaPeaksDeadline/last", getLastPeaksDeadline);

router.put("/api/biaPeaksDeadline/edit/:id", updatePeaksDeadline);

router.delete("/api/biaPeaksDeadline/delete/:id", deletePeaksDeadline);

module.exports = router;
