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

//  Delete Customer by Id
exports.deleteCustomerByID = async (req, res) => {
  try {
    const customerId = req.params.id; // Assuming the ID is passed in the URL as a parameter

    // Find customer by ID and delete
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer Not Found!" });
    }

    res.status(200).json({ message: "Customer deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, mobileNumber, province, company, subPreference } =
      req.body;
    const id = req.params.id;
    if (!name || !email || !mobileNumber) {
      return res.status(400).json({ error: "Please Enter Mandatory Data!" });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobileNumber,
        province,
        company,
        subPreference,
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer Not Found!" });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
