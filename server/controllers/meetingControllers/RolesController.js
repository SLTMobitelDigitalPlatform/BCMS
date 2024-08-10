const Role = require("../../models/meetingModels/RolesModel");

// Store new role data
const createRole = (req, res) => {
  const { roles, responsibilities } = req.body;
  const role = new Role({
    roles,
    responsibilities,
  });
  role
    .save()
    .then(() => res.status(200).json("Role added successfully"))
    .catch((err) => res.status(400).json({ Error: err }));
};

// Get all roles
const getRoles = (req, res) => {
  Role.find()
    .then((roles) => res.json(roles))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Update all roles
const updateRoles = (req, res) => {
  const rolesToUpdate = req.body;

  const updatePromises = rolesToUpdate.map((role) => {
    return Role.findByIdAndUpdate(role._id, {
      $set: {
        roles: role.roles,
        responsibilities: role.responsibilities,
      },
    });
  });

  Promise.all(updatePromises)
    .then(() => res.json("Roles updated successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  createRole,
  getRoles,
  updateRoles,
};
