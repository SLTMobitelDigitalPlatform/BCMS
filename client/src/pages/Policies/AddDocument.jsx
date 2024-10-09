import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDocument = () => {
  const [formData, setFormData] = useState({
    cINumber: "",
    contactInquiriesPerson: "",
    dPNumber: "",
    documentPrepPerson: "",
    cCNumber: "",
    controlledCirculationPerson: "",
    iRNumber: "",
    issueNumber: "",
    issueDate: "",
    riviseNumber: "",
    rivisedDate: "",
    rivisedDescription: "",
    introduction: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 4) {
      try {
        const response = await axios.post(
          "http://localhost:5000/policy/create",
          formData
        ); // Assuming your backend endpoint
        console.log("Form submitted", response.data);
        navigate("/policies"); // Redirect to the Policies page after successful submission
      } catch (error) {
        console.error("Error submitting form", error);
      }
    } else {
      nextStep();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto relative">
      <button className="absolute top-4 right-4 text-black text-xl font-semibold">
        ✕
      </button>
      <h2 className="text-2xl font-semibold text-blue-900 text-center mb-6">
        Add Document
      </h2>

      {/* Progress Bar */}
      <div className="flex justify-around items-center mb-6">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="text-center">
            <p className="text-sm font-medium">Section {step}</p>
            <div
              className={`w-4 h-4 ${
                currentStep >= step ? "bg-green-500" : "bg-gray-300"
              } rounded-full mx-auto`}
            ></div>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="max-h-96 overflow-y-auto mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-black">
                Section 1 - Contact for Inquiries & Proposed Changes
              </h3>
              <input
                name="cINumber"
                type="text"
                placeholder="CIN Number"
                value={formData.cINumber}
                onChange={handleInputChange}
                className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="contactInquiriesPerson"
                type="text"
                placeholder="Contact Inquiries Person"
                value={formData.contactInquiriesPerson}
                onChange={handleInputChange}
                className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-black">
                Section 2 - Document Preparation Committee
              </h3>
              <input
                name="dPNumber"
                type="text"
                placeholder="DP Number"
                value={formData.dPNumber}
                onChange={handleInputChange}
                className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="documentPrepPerson"
                type="text"
                placeholder="Document Prep Person"
                value={formData.documentPrepPerson}
                onChange={handleInputChange}
                className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-black">
                Section 3 - Controlled Circulation List
              </h3>
              <input
                name="cCNumber"
                type="text"
                placeholder="Controlled Circulation Number"
                value={formData.cCNumber}
                onChange={handleInputChange}
                className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="controlledCirculationPerson"
                type="text"
                placeholder="Controlled Circulation Person"
                value={formData.controlledCirculationPerson}
                onChange={handleInputChange}
                className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-semibold text-black">
                Section 4 - Enforcement/Revision Table
              </h3>
              <input
                name="riviseNumber"
                type="text"
                placeholder="Revise Number"
                value={formData.riviseNumber}
                onChange={handleInputChange}
                className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="rivisedDescription"
                type="text"
                placeholder="Revision Description"
                value={formData.rivisedDescription}
                onChange={handleInputChange}
                className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          <div className="mt-4 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700"
              >
                &lt; Previous
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700"
            >
              {currentStep === 4 ? "Submit" : "Next >"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocument;
