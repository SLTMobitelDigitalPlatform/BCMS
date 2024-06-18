const NewMeeting = require("../models/NewMeetingModel");

// Get all meetings data
const getMeetings = (req, res) => {
  NewMeeting.find()
    .then((NewMeeting) => res.status(200).json(NewMeeting))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

// Store new meeting data
const createMeeting = (req, res) => {
  const { purpose, location, date, startTime, endTime, attendees, chairedBy } = req.body;
  const newMeeting = new NewMeeting({
    purpose,
    location,
    date,
    startTime,
    endTime,
    attendees,
    chairedBy,
  });
  newMeeting
    .save()
    .then(() => res.status(200).json("Meeting added successfully"))
    .catch((err) => res.status(400).json({ Error: err }));
};


// Delete a meeting

const deleteMeeting = (req, res) => {
  NewMeeting.findByIdAndDelete(req.params.id)
   .then(() => res.json("Meeting deleted."))
   .catch((err) => res.status(400).json("Error: " + err));
};

// Update a meeting

const updateMeeting = (req, res) => {
  NewMeeting.findById(req.params.id)
   .then((meeting) => {
      meeting.purpose = req.body.purpose;
      meeting.location = req.body.location;
      meeting.date = req.body.date;
      meeting.startTime = req.body.startTime;
      meeting.endTime = req.body.endTime;
      meeting.chairedBy = req.body.chairedBy;

      meeting
       .save()
       .then(() => res.json("Meeting updated!"))
       .catch((err) => res.status(400).json("Error: " + err));
    })
   .catch((err) => res.status(400).json("Error: " + err));
};

// Get a single meeting

const getSingleMeeting = (req, res) => {
  NewMeeting.findById(req.params.id)
   .then((meeting) => res.json(meeting))
   .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  getMeetings,
  createMeeting,
  deleteMeeting,
  updateMeeting,
  getSingleMeeting
};
