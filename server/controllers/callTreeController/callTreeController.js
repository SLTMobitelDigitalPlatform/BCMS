const CallTree = require("../../models/callTreeModels/callTree");

const getCallTreee = async (req, res) => {
  try {
    const { section } = req.query;
    if (!section) {
      return res.status(400).json({ message: "Section ID is required" });
    }

    const callTree = await CallTree.find({ section })
      .populate("parent", "title") // Populating 'parent' with only 'title'
      .populate("section", "name")
      .populate("personName", "name email designation profileImg contactNumber") // Populating 'personName' with 'name'
      .exec();

    res.status(200).json(callTree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCallTreeNode = async (req, res) => {
  try {
    const callTree = new CallTree(req.body);

    const newNode = await callTree.save();

    await newNode.populate("personName", "name");

    res.status(201).json(newNode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editCallTreeNode = async (req, res) => {
  try {
    const { id } = req.params;

    const editedNode = await CallTree.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate("personName", "name")
      .populate("parent", "title");

    res.status(200).json(editedNode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCallTreeNode = async (req, res) => {
  try {
    const { id } = req.params;
    await CallTree.findByIdAndDelete(id);
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
