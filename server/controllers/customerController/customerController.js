const Customer = require("../../models/customerModels/customerModel");

exports.getCustomers = async (req, res) => {
  try {
    const customerData = await Customer.find();
    if (!customerData || customerData.length === 0) {
      return res.status(404).json({ message: "User data not found!" });
    }
    res.status(200).json(customerData);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "User data not found!" });
    }
    res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, mobileNumber, province, company, subPreference } =
      req.body;

    if (!name || !email || !mobileNumber) {
      res.status(400).json({ error: "Please Enter Mandatory Data!" });
    }

    const customerExist = await Customer.findOne({ email });
    if (customerExist) {
      res.status(400).json({ error: "This Customer Already Exist in Db" });
    } else {
      const customerRegister = new Customer({
        name,
        email,
        mobileNumber,
        province,
        company,
        subPreference,
      });
      const storedData = await customerRegister.save();
      res.status(200).json(storedData);
    }
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.customerDelete = async (req, res) => {
  try {
    const { email } = req.body;

    const customerExist = await Customer.findOne({ email });
    if (!customerExist) {
      return res.status(404).json({ message: "Customer not found!" });
    }
    await Customer.deleteOne({ email });
    res.status(200).json({ message: "Customer Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong", error });
  }
};
