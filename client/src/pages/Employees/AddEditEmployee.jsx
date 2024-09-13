/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { registerUser, updateUser } from "../../services/userAPI";
import {
  validateEmail,
  validateMobileNumber,
  validateName,
  validateServiceNumber,
} from "../../utilities/helper";

import { useSections } from "../../hooks/useSections";

const AddEditEmployee = ({ employeeData, type, getAllEmployees, onClose }) => {
  const [name, setName] = useState(employeeData?.name || "");
  const [serviceNumber, setServiceNumber] = useState(
    employeeData?.serviceNumber || ""
  );
  const [designation, setDesignation] = useState(
    employeeData?.designation || ""
  );
  const [email, setEmail] = useState(employeeData?.email || "");
  const [role, setRole] = useState(employeeData?.role || "");
  const [section, setSection] = useState(employeeData?.section || "");
  // const [sectionNames, setSectionNames] = useState([]);
  const [contactNumber, setContactNumber] = useState(
    employeeData?.contactNumber || ""
  );

  const [error, setError] = useState("");

  const [hasError, setHasError] = useState(false);

  const { sections, fetchSections } = useSections();

  useEffect(() => {
    fetchSections();
  }, []);

  // Add new Employee
  const addNewEmployee = async () => {
    try {
      const response = await registerUser({
        name,
        serviceNumber,
        designation,
        email,
        role,
        section,
        contactNumber,
      });
      if (response.data) {
        getAllEmployees();
        onClose();
      }
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error);
      alert("An error occurred during registration.");
    }
  };

  // Edit Employee
  const updateEmployee = async () => {
    const employeeId = employeeData._id;
    try {
      const response = await updateUser(employeeId, {
        name,
        serviceNumber,
        designation,
        email,
        role,
        section,
        contactNumber,
      });

      if (response.data) {
        getAllEmployees();
        onClose();
      }
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error);
      alert("An error occurred while updating the user.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = await axios.post("/user/register", formData);

    if (!validateName(name)) {
      setError("Please enter a valid name.");
      setHasError(true);
      return;
    }
    setHasError(false);

    if (!validateServiceNumber(serviceNumber)) {
      setError("Please enter a valid service number.");
      setHasError(true);
      return;
    }
    setHasError(false);

    if (!designation.trim()) {
      setError("Please enter a valid designation.");
      setHasError(true);
      return;
    }
    setHasError(false);

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      setHasError(true);
      return;
    }
    setHasError(false);

    if (!role || role === "Select Role") {
      setError("Please select a valid role.");
      setHasError(true);
      return;
    }
    setHasError(false);

    if (!section || section === "Select Section") {
      setError("Please select a valid section.");
      setHasError(true);
      return;
    }
    setHasError(false);

    if (!validateMobileNumber(contactNumber)) {
      setError("Please enter a valid contact number.");
      setHasError(true);
      return;
    }
    setHasError(false);

    setError("");

    if (type === "edit") {
      updateEmployee();
    } else {
      addNewEmployee();
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl px-10 py-5">
      <h1 className="text-2xl font-bold mb-6">
        {type === "edit"
          ? `Update Employee - ${employeeData.serviceNumber}`
          : "Add New Employee"}
      </h1>

      <div className="flex flex-col gap-3">
        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className={` input-field ${
              hasError && !validateName(name)
                ? "input-field-error"
                : "input-field-border"
            }`}
          />
        </div>

        {/* Service Number */}
        <div className="flex flex-col">
          <label
            htmlFor="serviceNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Service Number
          </label>
          <input
            type="text"
            name="serviceNumber"
            id="serviceNumber"
            placeholder="Service Number"
            value={serviceNumber}
            onChange={({ target }) => setServiceNumber(target.value)}
            className={` input-field ${
              hasError && !validateServiceNumber(serviceNumber)
                ? "input-field-error"
                : "input-field-border"
            } `}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            className={` input-field ${
              hasError && !validateEmail(email)
                ? "input-field-error"
                : "input-field-border"
            } `}
          />
        </div>

        {/* Contact Number */}
        <div className="flex flex-col">
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            id="contactNumber"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={({ target }) => setContactNumber(target.value)}
            className={` input-field ${
              hasError && !validateMobileNumber(contactNumber)
                ? "input-field-error"
                : "input-field-border"
            } `}
          />
        </div>

        {/* Designation */}
        <div className="flex flex-col">
          <label
            htmlFor="designation"
            className="block text-sm font-medium text-gray-700"
          >
            Designation
          </label>
          <input
            type="text"
            name="designation"
            id="designation"
            placeholder="Designation"
            value={designation}
            onChange={({ target }) => setDesignation(target.value)}
            className={` input-field ${
              hasError && !designation.trim()
                ? "input-field-error"
                : "input-field-border"
            } `}
          />
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            type="text"
            name="role"
            id="role"
            placeholder="Role"
            value={role}
            onChange={({ target }) => setRole(target.value)}
            onFocus={() => setHasError(false)}
            className={` input-field ${
              hasError && !role ? "input-field-error" : "input-field-border"
            } `}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Super Admin">Super admin</option>
            <option value="Secretariat Coordinator">
              BCM secretariat coordinator{" "}
            </option>
            <option value="BCM Coordinator">BCM Coordinator </option>
            <option value="Person Giving Approvals">
              Person Giving Approvals (DGM, GM, CO){" "}
            </option>
            <option value="BCM Teams">BCM Teams </option>
            <option value="Employee">Employee </option>
            <option value="customer">Customer </option>
          </select>
        </div>

        {/* Section */}
        <div className="flex flex-col">
          <label
            htmlFor="section"
            className="block text-sm font-medium text-gray-700"
          >
            Section
          </label>
          <select
            type="text"
            id="section"
            name="section"
            placeholder="Section"
            value={section}
            onChange={({ target }) => setSection(target.value)}
            onFocus={() => setHasError(false)}
            className={` input-field ${
              hasError && !section ? "input-field-error" : "input-field-border"
            } `}
          >
            <option value="" disabled>
              Select Section
            </option>
            {sections.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex justify-center gap-8">
          <button
            onClick={handleSubmit}
            className="p-2 w-32 bg-sky-600 text-white rounded-lg font-semibold"
          >
            {type === "edit" ? "Update" : "Add"}
          </button>
          <button
            onClick={onClose}
            className="p-2 w-32 bg-red-500 text-center text-white rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditEmployee;
