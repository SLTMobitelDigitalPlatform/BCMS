// validation.js

// Function to validate the form data
export const validateFormData = (formData) => {
    let errors = {};
  
    // Validate name
    if (!formData.name) {
      errors.name = "Name is required";
    }
  
    // Validate service number
    if (!formData.serviceNumber) {
      errors.serviceNumber = "Service number is required";
    }

     // Validate designation
  if (!formData.designation) {
    errors.designation = "Designation is required";
  }
  
    // Validate email
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
  
    // Validate role
    if (!formData.role) {
      errors.role = "Role is required";
    }
  
    // Validate section
    if (!formData.section) {
      errors.section = "Section is required";
    }
  
    // Validate contact number
    if (!formData.contactNumber) {
      errors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      errors.contactNumber = "Contact number must be 10 digits";
    }
  
    return errors;
  };
  