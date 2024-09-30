import React from 'react';

const PoliciesPage = () => {
  return (
    <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg"> {/* Main container padding */}
      {/* Header section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-green-600">Organizational Policies</h2>
        <p className="text-blue-900 mt-2">Organizational Documents {'>'} Organizational Policies</p>
      </div>

      {/* Policy section */}
      <div className="bg-gray-100 border border-green-300 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-blue-900">Business Continuity Management Policy</h3>
          <button className="bg-blue-900 text-white py-2 px-4 rounded-md">Add Document</button>
        </div>

        {/* Policy list */}
        <div className="space-y-4">
          <PolicyItem title="Contact for Inquiries & Proposed Changes" />
          <PolicyItem title="Document Preparation Committee" />
          <PolicyItem title="Controlled Circulation List" />
          <PolicyItem title="Enforcement/Revision Table" />
        </div>
      </div>

      {/* Version Controller section */}
      {/*<div className="mt-8">
        <h3 className="text-lg font-medium text-blue-900">Version Controller</h3>
      </div>*/}
    </div>
  );
};

// PolicyItem Component
const PolicyItem = ({ title }) => {
  return (
    <div className="bg-blue-100 rounded-md p-4 flex justify-between items-center cursor-pointer hover:bg-blue-200 transition">
      <p className="text-base font-medium">{title}</p>
      <span>▼</span> {/* Can be replaced with an icon if needed */}
    </div>
  );
};

export default PoliciesPage;
