// import React, { useState } from 'react';
// import { MdClose } from 'react-icons/md';
// import { validateFormData } from './FormValidations';

// const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
//   const [errors, setErrors] = useState({}); // State to store form errors

//   // Function to handle form submission
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateFormData(rest); // Validate the form data
//     setErrors(validationErrors); // Set the errors state
//     if (Object.keys(validationErrors).length === 0) {
//       // If there are no errors, submit the form
//       handleSubmit(e);
//     }
//   };

//   // Function to handle input changes
//   const handleChange = (e) => {
//     // Clear the error message when the user starts typing in an input field
//     setErrors({ ...errors, [e.target.name]: undefined });
//     handleOnChange(e);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="relative bg-white w-full max-w-3xl lg:mr-4 rounded-lg shadow-md" style={{ marginRight: '2rem', border: '3px solid', borderColor: 'rgb(0, 0, 255)', borderRadius: '0.5rem' }}>
//         {/* Close Button */}
//         <div className="absolute top-0 right-0 mt-1 mr-2">
//           <div className="cursor-pointer text-gray-600 hover:text-gray-800" onClick={handleclose}>
//             <MdClose size={24} />
//           </div>
//         </div>

//         {/* Form Content */}
//         <form onSubmit={handleFormSubmit} className="p-2 space-y-2 my-1">
//           {/* Name */}
//           <div className="flex flex-col">
//             <label htmlFor="name" className="text-xs font-medium text-gray-700">Name:</label>
//             <input type="text" id="name" name="name" onChange={handleChange} value={rest.name} className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs" />
//             {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
//           </div>

// {/* Service Number */}
// <div className="flex flex-col">
//             <label htmlFor="serviceNumber" className="text-xs font-medium text-gray-700">Service Number:</label>
//             <input type="text" id="serviceNumber" name="serviceNumber" onChange={handleChange} value={rest.serviceNumber} className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs" />
//             {errors.serviceNumber && <p className="text-red-500 text-xs">{errors.serviceNumber}</p>}
//           </div>

//           {/* Designation */}
//           <div className="flex flex-col">
//             <label htmlFor="designation" className="text-xs font-medium text-gray-700">Designation:</label>
//             <input type="text" id="designation" name="designation" onChange={handleChange} value={rest.designation} className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs" />
//             {errors.designation && <p className="text-red-500 text-xs">{errors.designation}</p>}
//           </div>

//           {/* Email */}
//           <div className="flex flex-col">
//             <label htmlFor="email" className="text-xs font-medium text-gray-700">Email:</label>
//             <input type="email" id="email" name="email" onChange={handleChange} value={rest.email} className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs" />
//             {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//           </div>

//           {/* Role */}
//           <div className="flex flex-col">
//             <label htmlFor="role" className="text-xs font-medium text-gray-700">Role:</label>
//             <select id="role" name="role" onChange={handleChange} value={rest.role} className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs">
//               <option value="">Select Role</option>
//               <option value="user">User</option>
//               <option value="employee">Employee</option>
//             </select>
//             {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
//           </div>

//           {/* Section */}
//           <div className="flex flex-col">
//             <label htmlFor="section" className="text-xs font-medium text-gray-700">Section:</label>
//             <select id="section" name="section" onChange={handleChange} value={rest.section} className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs">
//               <option value="">Select Section</option>
//               <option value="section 1">Section 1</option>
//               <option value="section 2">Section 2</option>
//               <option value="section 3">Section 3</option>
//             </select>
//             {errors.section && <p className="text-red-500 text-xs">{errors.section}</p>}
//           </div>

//           {/* Contact Number */}
//           <div className="flex flex-col">
//             <label htmlFor="contactNumber" className="text-xs font-medium text-gray-700">Contact Number:</label>
//             <input type="tel" id="contactNumber" name="contactNumber" onChange={handleChange} value={rest.contactNumber} className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs" />
//             {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber}</p>}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <button type="submit" className="btn bg-gradient-to-r from-blue-900 via-blue-700 to-green-500 text-white px-8 py-3 rounded-md hover:bg-gradient-to-r hover:from-green-900 hover:via-green-700 hover:to-blue-600 hover:text-white transition duration-300 text-xs">Submit</button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default Formtable;
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { validateFormData } from "./FormValidations";
import { useNavigate } from "react-router-dom";

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  const [errors, setErrors] = useState({}); // State to store form errors
  const navigate = useNavigate();

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(rest); // Validate the form data
    setErrors(validationErrors); // Set the errors state
    if (Object.keys(validationErrors).length === 0) {
      // If there are no errors, submit the form
      handleSubmit(e);
    }
    handleFormClose();
  };

  // Function to handle input changes
  const handleChange = (e) => {
    // Clear the error message when the user starts typing in an input field
    setErrors({ ...errors, [e.target.name]: undefined });
    handleOnChange(e);
  };

  // Function to handle form close and refresh the page
  const handleFormClose = () => {
    handleclose();
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="relative bg-white w-full max-w-3xl lg:mr-4 rounded-lg shadow-md"
        style={{
          marginRight: "2rem",
          border: "3px solid",
          borderColor: "rgb(0, 0, 255)",
          borderRadius: "0.5rem",
        }}
      >
        {/* Close Button */}
        <div className="absolute top-0 right-0 mt-1 mr-2">
          <div
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={handleFormClose}
          >
            <MdClose size={24} />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleFormSubmit} className="p-2 space-y-2 my-1">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-xs font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={rest.name}
              className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Service Number */}
          <div className="flex flex-col">
            <label
              htmlFor="serviceNumber"
              className="text-xs font-medium text-gray-700"
            >
              Service Number:
            </label>
            <input
              type="text"
              id="serviceNumber"
              name="serviceNumber"
              onChange={handleChange}
              value={rest.serviceNumber}
              className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs"
            />
            {errors.serviceNumber && (
              <p className="text-red-500 text-xs">{errors.serviceNumber}</p>
            )}
          </div>

          {/* Designation */}
          <div className="flex flex-col">
            <label
              htmlFor="designation"
              className="text-xs font-medium text-gray-700"
            >
              Designation:
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              onChange={handleChange}
              value={rest.designation}
              className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs"
            />
            {errors.designation && (
              <p className="text-red-500 text-xs">{errors.designation}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-xs font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={rest.email}
              className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label htmlFor="role" className="text-xs font-medium text-gray-700">
              Role:
            </label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
              value={rest.role}
              className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs"
            >
              <option value="">Select Role</option>
              <option value="superadmin">Super admin</option>
              <option value="secretariat coordinator">
                BCM secretariat coordinator{" "}
              </option>
              <option value="coordinators">BCM coordinators </option>
              <option value="persons giving approvals">
                Persons giving approvals (DGM, GM, CO){" "}
              </option>
              <option value="bcmteams">BCM teams </option>
              <option value="employee">Employee </option>
              <option value="customer">Customer </option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role}</p>
            )}
          </div>

          {/* Section */}
          <div className="flex flex-col">
            <label
              htmlFor="section"
              className="text-xs font-medium text-gray-700"
            >
              Section:
            </label>
            <select
              id="section"
              name="section"
              onChange={handleChange}
              value={rest.section}
              className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs"
            >
              <option value="">Select Section</option>
              <option value="humanresources">Human Resources(HR) </option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="finance">Finance</option>
              <option value="operations">Operations</option>
              <option value="informationtechnology ">
                Information Technology (IT)
              </option>
              <option value="customerservice">Customer Service</option>
            </select>
            {errors.section && (
              <p className="text-red-500 text-xs">{errors.section}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className="flex flex-col">
            <label
              htmlFor="contactNumber"
              className="text-xs font-medium text-gray-700"
            >
              Contact Number:
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              onChange={handleChange}
              value={rest.contactNumber}
              className="input-field border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-xs"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs">{errors.contactNumber}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn bg-gradient-to-r from-blue-900 via-blue-700 to-green-500 text-white px-8 py-3 rounded-md hover:bg-gradient-to-r hover:from-green-900 hover:via-green-700 hover:to-blue-600 hover:text-white transition duration-300 text-xs"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formtable;
