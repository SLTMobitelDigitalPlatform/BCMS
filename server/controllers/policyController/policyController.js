const Policy = require("../../models/policiesModels/policy");

const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find()
      .populate("contactInquiriesPerson")
      .populate("documentPrepPerson")
      .populate("controlledCirculationPerson");

    if (!policies) {
      return res.status(404).json({ message: "Policies Not Found!" });
    }
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPolicyById = async (req, res) => {
  try {
    const { id } = req.params;

    const policyById = await Policy.findById(id)
      .populate("contactInquiriesPerson")
      .populate("documentPrepPerson")
      .populate("controlledCirculationPerson");

    if (!policyById) {
      return res.status(404).json({ message: "Policy Not Found!" });
    }
    res.status(200).json(policyById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPolicy = async (req, res) => {
  try {
    const policy = new Policy(req.body);

    const createdPolicy = await policy.save();
    res.status(201).json(createdPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editPolicy = async (req, res) => {
  try {
    const policyToUpdate = await Policy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!policyToUpdate) {
      return res.status(404).json({ message: "Policy Not Found!" });
    }
    res.status(201).json(policyToUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePolicy = async (req, res) => {
  try {
    const policyToDelete = await Policy.findByIdAndDelete(req.params.id);
    if (!policyToDelete)
      return res.status(404).json({ message: "Policy not found" });
    res.status(200).json({ message: "Policy Deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastPolicy = async (req, res) => {
  try {
    const lastPolicy = await Policy.findOne().sort({ _id: -1 });
    res.status(200).json(lastPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPolicies,
  getPolicyById,
  createPolicy,
  editPolicy,
  deletePolicy,
  getLastPolicy,
};
