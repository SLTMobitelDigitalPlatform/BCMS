const express = require("express");
const router = express.Router();
const Feedback = require("../../models/homeModels/FeedbackModel");

router.post("/feedback", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const feedback = new Feedback({
      name,
      email,
      subject,
      message,
    });

    await feedback.save();
    res.json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Assuming you have a Feedback model
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks" });
  }
});

module.exports = router;
