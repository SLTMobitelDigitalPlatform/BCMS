const Objective = require("../../models/documentModels/objectivesModel");

const getObjectives = async (req, res) => {
  const objectives = await Objective.find();
  if (!objectives) {
    return res.status(404).json({ message: "Objective not found" });
  }
  res.status(200).json(objectives);

  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getObjectivesById = async (req, res) => {
  const { id } = req.params;
  const objectiveById = await Objective.findById(id);
  try {
    if (!objectiveById) {
      return res.status(404).json({ message: "Objective not found" });
    }
    res.status(200).json(objectiveById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createObjective = async (req, res) => {
  try {
    const objectiveToCreate = new Objective(req.body);
    await objectiveToCreate.save();
    res.status(200).json(objectiveToCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a risk assessment by ID
const editObjective = async (req, res) => {
  try {
    const { id } = req.params;
    const objectiveToEdit = await Objective.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!objectiveToEdit)
      return res.status(404).json({ message: "Objective not found" });
    res.status(200).json(objectiveToEdit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a risk assessment by ID
const deleteObjective = async (req, res) => {
  try {
    const { id } = req.params;
    const objectiveToDelete = await Objective.findByIdAndDelete(id);
    if (!objectiveToDelete)
      return res.status(404).json({ message: "Objective not found" });
    res.status(200).json({ message: "Objective deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getObjectives,
  getObjectivesById,
  createObjective,
  editObjective,
  deleteObjective,
};
