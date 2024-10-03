const OrgCallTree = require("../../models/callTreeModels/orgCallTree");

const getOrgCalltree = async (req, res) => {
  try {
    const { section } = req.query;
    if (!section) {
      return res.statu(400).json({ message: "Section Required!" });
    }

    const calltree = await OrgCallTree.find({ section })
      .populate("parent", "title")
      .populate("section", "name")
      .populate(
        "personName",
        "name email designation profileImg contactNumber"
      );

    res.status(200).json(calltree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrgCallTreeNode = async (req, res) => {
  try {
    const calltree = new OrgCallTree(req.body);
    const newNode = await calltree.save();
    await newNode.populate.populate("personName", "name");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editOrgCallTreeNode = async (req, res) => {
  try {
    const { id } = req.params;
    const editedNode = await OrgCallTree.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate("personName", "name")
      .populate("parent", "title");
    res.status(200).json(editedNode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteOrgCallTreeNode = async (req, res) => {
  try {
    const { id } = req.params;
    await OrgCallTree.findByIdAndDelete(id);
    res.status(200).json({ message: "Call Tree Node Deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrgCalltree,
  createOrgCallTreeNode,
  editOrgCallTreeNode,
  deleteOrgCallTreeNode,
};
