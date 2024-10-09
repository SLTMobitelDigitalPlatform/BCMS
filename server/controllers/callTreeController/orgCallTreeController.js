const OrgCallTree = require("../../models/callTreeModels/orgCallTree");

const getOrgCalltree = async (req, res) => {
  try {
    const calltree = await OrgCallTree.find()
      .populate("parent", "title")
      .populate(
        "personName",
        "name email section designation profileImg contactNumber"
      );
    // console.log(calltree);

    res.status(200).json(calltree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrgCallTreeNode = async (req, res) => {
  try {
    // Use the create() method to directly create and save the document
    let newNode = await OrgCallTree.create(req.body);

    newNode = await newNode.populate("personName", "name");

    res.status(201).json(newNode);
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
