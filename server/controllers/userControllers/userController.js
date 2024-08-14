const User = require("../../models/userModels/user");

exports.getusers = async (req, res) => {
  try {
    const userData = await User.find();

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User data not found!" });
    }

    res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User data not found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.userRegister = async (req, res) => {
  const {
    name,
    email,
    designation,
    section,
    serviceNumber,
    contactNumber,
    role,
    province,
    company,
    subPreference,
  } = req.body;

  if (!name || !email || !contactNumber) {
    res.status(400).json({ error: "Please Enter All Input Data" });
  }

  try {
    const presuer = await User.findOne({ email: email });

    if (presuer) {
      res.status(400).json({ error: "This User Allready exist in our db" });
    } else {
      const userregister = new User({
        name,
        email,
        serviceNumber,
        designation,
        section,
        contactNumber,
        role,
        province,
        company,
        subPreference,
      });

      // here password hasing

      const storeData = await userregister.save();
      res.status(200).json(storeData);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res.status(404).json({ message: "User not found!" });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Invalid Details", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res.status(404).json({ message: "User not found!" });
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong", error });
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    // req.user is set by the protect middleware

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
