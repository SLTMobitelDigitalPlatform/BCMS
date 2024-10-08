import React from 'react';
import '../css/RecoveryStrategy.css';
import Layout from '../components/Layout';
import searchIcon from '../assets/search.png';

const CBFunctions = () => {
  const rows = [
    { name: 'aaaaa', description: '', criticality: 'Priority 1', rto: '2 hours' },
    { name: 'bbbbb', description: '', criticality: '', rto: '' },
    { name: '', description: '', criticality: '', rto: '' },
  ];

  return (
    <div className="middle-section">
      <Layout/>
      <div className="form-container">
        <button className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>
        <h2>Critical Business Functions</h2>
        <div className="table-header">
        <p> </p>
        <button className="add-plan-btn">Add Details</button> {/* Gradient button */}
        </div>
        
        <div className="form-section">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Criticality</th>
                <th>RTO</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                  <td>{row.criticality}</td>
                  <td>{row.rto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default CBFunctions;