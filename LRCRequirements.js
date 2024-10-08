import React from 'react';
import '../css/RecoveryStrategy.css';
import Layout from '../components/Layout';
import searchIcon from '../assets/search.png';

const LRCRequirements = () => {
  const rows = [
    { name: 'SLT - Galle HQ', lrc: '', monby: '' },
    { name: '', lrc: '', monby: '' },
  ];
  return (
    <div className="middle-section">
      <Layout/>
      <div className="form-container">
        <h2>Legal Regulatory & Contractual Requirements</h2>
        <div className="table-header">
        <p> </p>
        <button className="add-plan-btn">Add Details</button> {/* Gradient button */}
        </div>

        <button className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>

        <div className="form-section">
          <table>
            <thead>
              <tr>
                <th>Name Of the Organization</th>
                <th>Legal, Regulatory & Contractual Requirements</th>
                <th>Monitored By</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.lrc}</td>
                  <td>{row.monby}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default LRCRequirements;