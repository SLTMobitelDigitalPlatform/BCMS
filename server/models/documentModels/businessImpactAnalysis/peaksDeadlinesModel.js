const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const peaksdeadlinesSchema = new Schema(
  {
    biaid: { type: String, required: true },
    peaksdeadlineName: { type: String, required: true },
    description: { type: String, required: true },
    timeOfDay: { type: String, required: true },
    dayOfWeek: { type: String, required: true },
    businessDay: { type: String, required: true },
    calendarDay: { type: String, required: true },
    month: { type: String, required: true }
  },
  { timestamps: true }
);

const peaksdeadlines = mongoose.model("peaksdeadlines", peaksdeadlinesSchema);

module.exports = peaksdeadlines;