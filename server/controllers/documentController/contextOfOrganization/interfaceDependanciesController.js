const InterfaceDependancy = require("../../../models/documentModels/interfaceDependancies");

const getInterfaceDependacy = async (req, res) => {
  try {
    const interfaceDependacy = await InterfaceDependancy.find();
    if (!interfaceDependacy) {
      return res.status(404).json({ message: "InterfaceDependancy not found" });
    }
    res.status(200).json(interfaceDependacy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInterfaceDependancyById = async (req, res) => {
  try {
    const { id } = req.params;
    const interfaceDependancyById = await InterfaceDependancy.findById(id);
    if (!interfaceDependancyById) {
      return res.status(404).json({ message: "InterfaceDependancy not found" });
    }
    res.status(200).json(interfaceDependancyById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInterfaceDependancy = async (req, res) => {
  try {
    const interfaceDependancyToCreate = new InterfaceDependancy(req.body);
    await interfaceDependancyToCreate.save();
    res.status(200).json(interfaceDependancyToCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInterfaceDependancy = async (req, res) => {
  try {
    const { id } = req.params;
    const interfaceDependancyToUpdate =
      await InterfaceDependancy.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    if (!interfaceDependancyToUpdate) {
      return res.status(404).json({ message: "InterfaceDependancy not found" });
    }
    res.status(200).json(interfaceDependancyToUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInterfaceDependancy = async (req, res) => {
  try {
    const { id } = req.params;
    const interfaceDependancyToDelete =
      await InterfaceDependancy.findByIdAndDelete(id);
    if (!interfaceDependancyToDelete) {
      return res.status(404).json({ message: "InterfaceDependancy not found" });
    }
    res
      .status(200)
      .json({ message: "InterfaceDependancy Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInterfaceDependacy,
  getInterfaceDependancyById,
  createInterfaceDependancy,
  updateInterfaceDependancy,
  deleteInterfaceDependancy,
};
