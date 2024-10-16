const mongoose = require("mongoose");

const preIncidentPreparationSchema = new mongoose.Schema({
  bcpid: { type: String, required: true },
  preIncidentMeasures: { type: String, required: true },
  frequencyOrSchedule: { type: String, required: true },
  frequencyOrScheduleResponsibility: { type: String, required: true },
});

module.exports = mongoose.model(
  "PreIncidentPreparation",
  preIncidentPreparationSchema
);
