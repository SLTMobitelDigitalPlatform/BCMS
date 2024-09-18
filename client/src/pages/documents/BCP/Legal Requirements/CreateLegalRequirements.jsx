import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { useUsers } from "../../../../hooks/useUsers";
import { useLegalRequirements } from "../../../../hooks/documents/bcp/useLegalRequirements";

const CreateLegalRequirements = () => {
  const [formData, setFormData] = useState({
    name: "",
    legalRequirements: "",
    monitoredBy: "",
  });

  const navigate = useNavigate();

  const { sortedUsers, loading, error, fetchUsers } = useUsers();
  const { addLegalRequirement } = useLegalRequirements();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Submit the form data to backend or API

    try {
      addLegalRequirement(formData);
      handleSuccessAlert();
      navigate(
        "/Business-Continuity-Plan/legal-regulatory-&-contractual-requirements"
      );
    } catch (error) {
      handleErrorAlert();
      console.log(error);
    }
  };

  // Error Alert
  const handleErrorAlert = () => {
    Swal.fire({
      title: "Something Went Wrong",
      text: "Fix it and try again",
      icon: "error",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Add New Legal Regulatory & Contractual Requirements
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">
              Legal Regulatory & Contractual Requirements
            </label>
            <input
              type="text"
              name="legalRequirements"
              value={formData.legalRequirements}
              onChange={handleChange}
              placeholder="Enter Legal Regulatory & Contractual Requirements"
              className="p-2 w-full rounded"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Monitored By</label>
            <Select
              options={sortedUsers}
              value={sortedUsers.find(
                (user) => user.value === formData.monitoredBy
              )}
              onChange={(option) => handleSelectChange(option, "monitoredBy")}
              isClearable={true}
              placeholder="Select Responsible Person"
            />
          </div>

          <div className="flex justify-start gap-2">
            <button
              type="submit"
              className="p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              Save
            </button>
            <Link
              to="/Business-Continuity-Plan/legal-regulatory-&-contractual-requirements"
              className="p-2 w-32 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLegalRequirements;
