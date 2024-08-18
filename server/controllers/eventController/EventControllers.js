const Event = require("../../models/eventModels/EventModels");
const User = require("../../models/userModels/user");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sltmobitelbcmssystem@gmail.com",
    pass: "lvbr ypwc atoa qcfi",
  },
});

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: "Error fetching events", error });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, start, end, describe, attendees } = req.body;

    // Create a new event
    const newEvent = new Event({ title, start, end, describe, attendees });
    await newEvent.save();

    // Fetch emails and names of all attendees
    const attendeeDetails = await User.find({
      _id: { $in: attendees },
    }).select("email name");

    // Prepare the list of attendee names
    const attendeeNames = attendeeDetails.map((att) => att.name).join(", ");

    // Send individual emails to each attendee
    for (const attendee of attendeeDetails) {
      const mailOptions = {
        from: "sltmobitelbcmssystem@gmail.com",
        to: attendee.email,
        subject: "New Event Scheduled",
        text: `Dear ${attendee.name},\n\nYou are invited to the following event:\n
               Title: ${title}\n
               Date: ${start}\n
               End: ${end}\n
               Attendees: ${attendeeNames}\n\n
               Note: This is an auto-generated email. Please do not reply to this email.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email to:", attendee.email, error);
        } else {
          console.log("Email sent to:", attendee.email, info.response);
        }
      });
    }

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { title, start, end, describe, attendees } = req.body;
    // console.log(describe);

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, start, end, describe, attendees },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Fetch emails and names of all attendees
    const attendeeDetails = await User.find({
      _id: { $in: attendees },
    }).select("email name");

    // Prepare the list of attendee names
    const attendeeNames = attendeeDetails.map((att) => att.name).join(", ");
    // console.log(attendeeDetails);
    // console.log(attendees);

    // Send individual emails to each attendee
    for (const attendee of attendeeDetails) {
      const mailOptions = {
        from: "sltmobitelbcmssystem@gmail.com",
        to: attendee.email,
        subject: "Event Updated",
        text: `Dear ${attendee.name},\n\nThe details of the event have been updated:\n
               Title: ${title}\n
              Date: ${start}\n
               End: ${end}\n
               Attendees: ${attendeeNames}\n\n
               Note: This is an auto-generated email. Please do not reply to this email.`,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent to:", attendee.email, info.response);
      } catch (error) {
        console.log("Error sending email to:", attendee.email, error);
      }
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Fetch emails and names of all attendees
    const attendeeDetails = await User.find({
      _id: { $in: event.attendees },
    }).select("email name");

    // Send individual emails to each attendee
    for (const attendee of attendeeDetails) {
      const mailOptions = {
        from: "sltmobitelbcmssystem@gmail.com",
        to: attendee.email,
        subject: "Event Cancelled",
        text: `Dear ${attendee.name},\n\nThe event titled "${event.title}" scheduled on ${event.start} has been cancelled.\n
               Description: ${event.describe}\n
               Note: This is an auto-generated email. Please do not reply to this email.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email to:", attendee.email, error);
        } else {
          console.log("Email sent to:", attendee.email, info.response);
        }
      });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};
