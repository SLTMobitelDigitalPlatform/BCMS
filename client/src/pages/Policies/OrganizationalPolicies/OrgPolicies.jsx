import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PoliciesPage = () => {
  const [policies, setPolicies] = useState([]);
  const [isContactVisible, setIsContactVisible] = useState(true);
  const [isDocumentPrepVisible, setIsDocumentPrepVisible] = useState(true);
  const [isControlledCirculationVisible, setIsControlledCirculationVisible] =
    useState(true);
  const [isEnforcementVisible, setIsEnforcementVisible] = useState(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/policies"); // Fetching policies from backend
        setPolicies(response.data);
      } catch (error) {
        console.error("Error fetching policies", error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg">
      <div className="mb-6 ">
        <h2 className="text-2xl font-semibold text-green-600">
          Organizational Policies
        </h2>
        <p className="text-blue-900 mt-2">
          Organizational Documents {">"} Organizational Policies
        </p>
      </div>

      <div className="bg-gray-100 border border-green-300 p-6 rounded-lg max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-600">
            Business Continuity Management Policy
          </h2>
          <Link
            to="/policies/add-document"
            className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Add Document
          </Link>
        </div>

        {/* Contact for Inquiries Section */}
        <h2 className="text-xl font-semibold text-green-600">
          Contact for Inquiries & Proposed Change
        </h2>
        <button
          onClick={() => setIsContactVisible(!isContactVisible)}
          className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-2 rounded"
        >
          {isContactVisible ? "Hide Table" : "Show Table"}
        </button>
        {isContactVisible && (
          <table className="table-fixed w-full mb-8">
            <thead className="sticky top-0 bg-indigo-200">
              <tr>
                <th className="w-20 doc-table-head">NO</th>
                <th className="w-20 doc-table-head">Name</th>
                <th className="w-48 doc-table-head">Designation</th>
                <th className="w-48 doc-table-head">Contact NO</th>
                <th className="w-48 doc-table-head">Email</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((contact) => (
                <tr key={contact._id} className="doc-table-hover">
                  <td className="py-2 px-4 w-20 doc-table-data text-center">
                    {contact.cINumber}
                  </td>
                  <td className="py-2 px-4 w-20 doc-table-data text-center">
                    {contact.contactInquiriesPerson.name}
                  </td>
                  <td className="py-2 px-4 w-48 doc-table-data">
                    {contact.contactInquiriesPerson.designation}
                  </td>
                  <td className="py-2 px-4 w-48 doc-table-data">
                    {contact.contactInquiriesPerson.contactNumber}
                  </td>
                  <td className="py-2 px-4 w-48 doc-table-data">
                    {contact.contactInquiriesPerson.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Document Preparation Committee Section */}
        <h2 className="text-xl font-semibold text-green-600 mt-20">
          Document Preparation Committee
        </h2>
        <button
          onClick={() => setIsDocumentPrepVisible(!isDocumentPrepVisible)}
          className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-2 rounded"
        >
          {isDocumentPrepVisible ? "Hide Table" : "Show Table"}
        </button>
        {isDocumentPrepVisible && (
          <table className="table-fixed w-full mb-8">
            <thead className="sticky top-0 bg-indigo-200">
              <tr>
                <th className="w-20 doc-table-head">NO</th>
                <th className="w-20 doc-table-head">Name</th>
                <th className="w-48 doc-table-head">Designation</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((contact) => (
                <tr key={contact._id} className="doc-table-hover">
                  <td className="py-2 px-4 w-20 doc-table-data text-center">
                    {contact.dPNumber}
                  </td>
                  <td className="py-2 px-4 w-20 doc-table-data text-center">
                    {contact.documentPrepPerson.name}
                  </td>
                  <td className="py-2 px-4 w-48 doc-table-data text-center">
                    {contact.documentPrepPerson.designation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Controlled Circulation List Section */}
        <h2 className="text-xl font-semibold text-green-600 mt-20">
          Controlled Circulation List
        </h2>
        <button
          onClick={() =>
            setIsControlledCirculationVisible(!isControlledCirculationVisible)
          }
          className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-2 rounded"
        >
          {isControlledCirculationVisible ? "Hide Table" : "Show Table"}
        </button>
        {isControlledCirculationVisible && (
          <table className="table-fixed w-full mb-8">
            <thead className="sticky top-0 bg-indigo-200">
              <tr>
                <th className="w-20 doc-table-head">NO</th>
                <th className="w-20 doc-table-head">Name</th>
                <th className="w-48 doc-table-head">Designation</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((contact) => (
                <tr key={contact._id} className="doc-table-hover">
                  <td className="py-2 px-4 w-20 doc-table-data text-center">
                    {contact.dPNumber}
                  </td>
                  <td className="py-2 px-4 w-20 doc-table-data text-center">
                    {contact.documentPrepPerson.name}
                  </td>
                  <td className="py-2 px-4 w-48 doc-table-data text-center">
                    {contact.documentPrepPerson.designation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Enforcement/Revision Table Section */}
        <h2 className="text-xl font-semibold text-green-600 mt-20">
          Enforcement/Revision Table
        </h2>
        <button
          onClick={() => setIsEnforcementVisible(!isEnforcementVisible)}
          className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-2 rounded"
        >
          {isEnforcementVisible ? "Hide Table" : "Show Table"}
        </button>
        {isEnforcementVisible && (
          <table className="table-fixed w-full mb-36">
            <thead className="sticky top-0 bg-indigo-200">
              <tr>
                <th className="w-20 doc-table-head">NO</th>
                <th className="w-20 doc-table-head">Issue No</th>
                <th className="w-48 doc-table-head">Issue Date</th>
                <th className="w-48 doc-table-head">Rivise No</th>
                <th className="w-48 doc-table-head">Rivision Date</th>
                <th className="w-48 doc-table-head">Rivised Description</th>
                <th className="w-48 doc-table-head">Issue Document Details</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((contact) => (
                <tr key={contact._id} className="doc-table-hover">
                  <td className="py-2 px-4 w-20 doc-table-data text-center">
                    {contact.iRNumber}
                  </td>
                  <td className="py-2 px-4 w-20 doc-table-data text-center">
                    {contact.issueNumber}
                  </td>
                  <td className="py-2 px-4 w-48 doc-table-data text-center">
                    {contact.issueDate}
                  </td>
                  <td className="py-2 px-4 w-48 doc-table-data text-center">
                    {contact.riviseNumber}
                  </td>
                  <td className="py-2 px-4 w-48 doc-table-data text-center">
                    {contact.rivisedDate}
                  </td>
                  <td className="py-2 px-4 w-48 doc-table-data text-center">
                    {contact.rivisedDescription}
                  </td>
                  <td className="py-2 px-4 w-28 doc-table-data">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/viewPolicy/${contact._id}`}
                        className="doc-edit-btn"
                      >
                        View
                      </Link>
                      <Link to={""} className="doc-edit-btn">
                        Edit
                      </Link>
                      <button className="doc-delete-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PoliciesPage;
