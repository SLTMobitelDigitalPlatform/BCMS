const CallTree = require("../../models/callTreeModels/callTree");

const getCallTreee = async (req, res) => {
  try {
    const callTree = await CallTree.find().populate("children").exec();
    res.status(200).json(callTree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCallTreeNode = async (req, res) => {
  try {
    const callTree = new CallTree({
      label: req.body.label,
      mobileNumber: req.body.mobileNumber,
      children: req.body.children || [],
    });
    const newNode = await callTree.save();
    res.status(201).json(newNode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editCallTreeNode = async (req, res) => {
  try {
    const editedNode = await CallTree.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(editedNode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCallTreeNode = async (req, res) => {
  try {
    await CallTree.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Call Tree Node deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCallTreee,
  createCallTreeNode,
  editCallTreeNode,
  deleteCallTreeNode,
};
