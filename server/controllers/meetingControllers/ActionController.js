const actions = require("../../models/meetingModels/ActionModel");

const createActions = async (req, res) => {
  const { id } = req.params;
  const actionDetails = req.body;

  try {
    for (const detail of actionDetails) {
      const newActions = new actions({
        meetingId: id,
        attendeeId: detail.attendeeId,
        actionNo: detail.actionNo,
        action: detail.action,
        discription: detail.discription,
        targetDate: detail.targetDate,
        status: detail.status,
        comment: detail.comment,
      });

      await newActions.save();
    }

    res.status(201).json({ message: "Action details stored successfully" });
  } catch (error) {
    console.error("Error storing Action details:", error);
    res.status(500).json({ message: "Failed to store Action details", error });
  }
};

//get action data for a meeting
const getsingleActionData = (req, res) => {
  actions
    .find({ meetingId: req.params.meetingId })
    .then((actions) => res.json(actions))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  createActions,
  getsingleActionData,
};
