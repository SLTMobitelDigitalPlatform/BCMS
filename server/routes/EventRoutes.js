const express = require('express');
const { getAllEvents, createEvent, updateEvent, deleteEvent, getEventById } = require('../controllers/EventControllers');

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.get('/:id', getEventById);

module.exports = router;
