const express = require("express");
const eventControllers = require("../../controllers/eventController/EventControllers");
const authControllers = require("../../controllers/userControllers/authController");

const router = express.Router();

router.get("/events/", eventControllers.getAllEvents);
router.post("/events/", eventControllers.createEvent);
router.put("/events/:id", eventControllers.updateEvent);
router.delete("/events/:id", eventControllers.deleteEvent);
router.get("/events/:id", eventControllers.getEventById);

module.exports = router;
