import React from 'react';
import '../css/RecoveryStrategy.css';
import Layout from '../components/Layout';
import searchIcon from '../assets/search.png';

const WorkAreaRecovery = () => {
  const rows = [
    { site: 'Walikada DR Site', avalform: '1 hour', avalto: '24 Weeks', td: '6 Km', tt: '30 min', cn: 'Main' },
    { site: '', avalform: '', avalto: '', td: '', tt: '', cn: '' },
    { site: '', avalform: '', avalto: '', td: '', tt: '', cn: '' },
    { site: '', avalform: '', avalto: '', td: '', tt: '', cn: '' },
    { site: '', avalform: '', avalto: '', td: '', tt: '', cn: '' },
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
                <th>Site</th>
                <th>Available From</th>
                <th>Available To</th>
                <th>Travel Distance</th>
                <th>Travel Time</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.site}</td>
                  <td>{row.avalform}</td>
                  <td>{row.avalto}</td>
                  <td>{row.td}</td>
                  <td>{row.tt}</td>
                  <td>{row.cn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default WorkAreaRecovery;