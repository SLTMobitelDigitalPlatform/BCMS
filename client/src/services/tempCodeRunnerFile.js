export const registerCustomer = async (formData) => {
  const response = await axiosInstance.post("/customer/register", formData);
  return response;
};