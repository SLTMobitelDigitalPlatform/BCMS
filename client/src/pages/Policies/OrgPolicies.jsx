import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const PoliciesPage = () => {
    return (
      <div className="policies-page">
        <div className="policies-header">
          <h2>Organizational Policies</h2>
          <p>Organizational Documents {'>'} Organizational Policies</p>
        </div>
  
        <div className="policy-section">
          <div className="policy-header">
            <h3>Business Continuity Management Policy</h3>
            <button className="add-document-button">Add Document</button>
          </div>
  
          <div className="policy-list">
            <PolicyItem title="Contact for Inquiries & Proposed Changes" />
            <PolicyItem title="Document Preparation Committee" />
            <PolicyItem title="Controlled Circulation List" />
            <PolicyItem title="Enforcement/Revision Table" />
          </div>
        </div>
  
        <div className="version-controller">
          <h3>Version Controller</h3>
        </div>
      </div>
    );
  };
  
  const PolicyItem = ({ title }) => {
    return (
      <div className="policy-item">
        <p>{title}</p>
        <span>▼</span>
      </div>
    );
  };
  
  export default PoliciesPage;