const Objectives = require("../../models/documentModels/objectivesModel");

const createObjectives = async (req, res) => {
  const { id } = req.params;
  const objectiveDetails = req.body;

  try {
    for (const detail of objectiveDetails) {
      const newObject = new Objectives({
        serialNo: id,
        versionNo: detail.versionNo,
        preparedBy: detail.preparedBy,
      });
      await newObject.save();
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to store details", error });
  }
};

module.exports = {
  createObjectives,
};
