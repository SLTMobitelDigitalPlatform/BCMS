import { useState } from "react";
import axiosInstance from "../services/axiosInstance";

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const response = await axiosInstance.get("/customer/getall");
      setCustomers(response.data);
    } catch (err) {
      handleError("Error fetching customers data.", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch customer details
  const fetchCustomerDetails = async (id) => {
    try {
      const response = await axiosInstance.get(`/customer/${id}`);
      setCustomer(response.data);
    } catch (err) {
      handleError("Error fetching customer data.", err);
    } finally {
      setLoading(false);
    }
  };

  const sortedCustomers = customers
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((customer) => ({ value: customer.name, label: customer.name }));

  // Register a new customer
  const registerCustomer = async (formData) => {
    try {
      await axiosInstance.post("/customer/register", formData);
      await fetchCustomers();
    } catch (err) {
      handleError("Error registering customer.", err);
    }
  };

  // Update a customer
  const updateCustomer = async (id, updatedData) => {
    try {
      await axiosInstance.put(`/customer/update/${id}`, updatedData);
      await fetchCustomers();
    } catch (err) {
      handleError("Error updating customer.", err);
    }
  };

  // Delete a customer
  const deleteCustomer = async () => {
    try {
      await axiosInstance.delete("/customer/delete");
      await fetchCustomers();
    } catch (err) {
      handleError("Error deleting customer.", err);
    }
  };

  // Delete a customer by ID
  const deleteCustomerByID = async (id) => {
    try {
      await axiosInstance.delete(`/customer/deleteByID/${id}`);
      await fetchCustomers();
    } catch (err) {
      handleError("Error deleting customer.", err);
    }
  };

  // Handle errors
  const handleError = (message, err) => {
    setError(message);
    console.error(message, err.response?.data || err);
  };

  return {
    customers,
    customer,
    sortedCustomers,
    loading,
    error,
    fetchCustomers,
    fetchCustomerDetails,
    registerCustomer,
    updateCustomer,
    deleteCustomer,
    deleteCustomerByID,
  };
};
