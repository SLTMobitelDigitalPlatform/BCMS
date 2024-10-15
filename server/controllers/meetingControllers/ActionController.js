const actions = require("../../models/meetingModels/ActionModel.js");

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
        description: detail.description,
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

// get actions data for specific meeting id
const getActions = async (req, res) => {
  const { meetingId } = req.params;
  // console.log(req.params);
  // console.log(meetingId);
  try {
    const actionData = await actions
      .find({ meetingId: meetingId })
      .populate("attendeeId", "name");
    res.status(200).json(actionData);
  } catch (error) {
    console.error("Error fetching action data:", error);
    res.status(500).json({ message: "Failed to fetch action data", error });
  }
};

// update action data for specific meeting id
const updateActions = async (req, res) => {
  const { id } = req.params;
  const {
    attendeeId,
    actionNo,
    action,
    description,
    targetDate,
    status,
    comment,
  } = req.body;

  try {
    const actionToUpdate = await actions.findById(id);
    if (!actionToUpdate) {
      return res.status(404).json({ message: "Action not found" });
    }

    actionToUpdate.attendeeId = attendeeId;
    actionToUpdate.actionNo = actionNo;
    actionToUpdate.action = action;
    actionToUpdate.description = description;
    actionToUpdate.targetDate = targetDate;
    actionToUpdate.status = status;
    actionToUpdate.comment = comment;

    await actionToUpdate.save();
    res.json({ message: "Action updated successfully" });
  } catch (error) {
    console.error("Error updating action:", error);
    res.status(500).json({ message: "Failed to update action", error });
  }
};

module.exports = {
  createActions,
  getActions,
  updateActions,
};
