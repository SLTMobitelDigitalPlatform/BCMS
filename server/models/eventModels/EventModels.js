const moment = require("moment");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please write a title for your event"],
  },
  start: {
    type: Date,
    required: [true, "Please Insert The Start of your event"],
    min: [new Date(), "Event start date can't be before now!"],
  },
  end: {
    type: Date,
    // Setting a min function to accept any date one hour ahead of start
    min: [
      function () {
        const date = new Date(this.start);
        const validDate = new Date(date.setHours(date.getHours() + 1));
        return validDate;
      },
      "Event end must be at least one hour ahead of event start time",
    ],
    default: function () {
      const date = new Date(this.start);
      return date.setDate(date.getDate() + 1);
    },
  },
  describe: {
    type: String,
  },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Event", EventSchema);
