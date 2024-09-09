import axiosInstance from "./axiosInstance";

// Register a new customer
export const registerCustomer = async (formData) => {
  const response = await axiosInstance.post("/customer/register", formData);
  return response;
};

// Get all customers
export const getCustomers = async () => {
  const response = await axiosInstance.get("/customer/getall");
  return response;
};

// Get a customer by ID
export const getCustomerById = async (id) => {
  const response = await axiosInstance.get(`/customer/${id}`);
  return response;
};

// Delete a customer
export const deleteCustomer = async () => {
  const response = await axiosInstance.delete(`/customer/delete`);
  return response;
};

// Delete a customer by Id
export const deleteCustomerByID = async (id) => {
  const response = await axiosInstance.delete(`/customer/deleteByID/${id}`);
  return response;
};

// Update a customer
export const updateCustomer = async (id, updatedData) => {
  const response = await axiosInstance.put(
    `/customer/update/${id}`,
    updatedData
  );
  return response;
};
