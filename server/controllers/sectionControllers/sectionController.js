const Section = require("../../models/sectionModels/section");

const getSections = async (req, res) => {
  try {
    const sections = await Section.find();
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
    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({ message: "Section data not found!" });
    }
    res.status(200).json(section);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const createSection = async (req, res) => {
  const { sectionCode, name } = req.body;

  try {
    const existingSection = await Section.findOne({ sectionCode });
    if (existingSection) {
      return res.status(400).json({ message: "Section code already exists." });
    }

    const section = new Section({ sectionCode, name });
    await section.save();
    res.status(201).json(section);
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
    });
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
    const sectionToDelete = await Section.findByIdAndDelete(id);
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
