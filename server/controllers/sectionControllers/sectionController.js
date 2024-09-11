const Section = require("../../models/sectionModels/section");

const getSections = async (req, res) => {
  try {
    // Populating sectionCoordinator with user details
    const sections = await Section.find().populate(
      "sectionCoordinator",
      "name email designation"
    );
    if (!sections) {
      return res.status(404).json({ message: "Section data not found!" });
    }
    res.status(200).json(sections);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const getSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    // Populating sectionCoordinator with user details
    const section = await Section.findById(id).populate(
      "sectionCoordinator",
      "name email designation"
    );
    if (!section) {
      return res.status(404).json({ message: "Section data not found!" });
    }
    res.status(200).json(section);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const createSection = async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.save();
    // Populate sectionCoordinator if available
    const newSection = await section.populate(
      "sectionCoordinator",
      "name email designation"
    );

    res.status(200).json(newSection);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const editSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({ message: "Section data not found!" });
    }
    const sectionToEdit = await Section.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("sectionCoordinator", "name email designation"); // Populate after update
    res.status(200).json(sectionToEdit);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({ message: "Section data not found!" });
    }
    await Section.findByIdAndDelete(id);
    res.status(200).json({ message: "Section Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = {
  getSections,
  getSectionById,
  createSection,
  editSection,
  deleteSection,
};
