import React from 'react';
import '../css/ResourceRequired.css';
import Layout from '../components/Layout';
import searchIcon from '../assets/search.png';

const ResourceRequired = () => {
  const rows = [
    { name: 'Human Resources', quantity: '27', rto: '0.5 Hrs', justification: '', rpo: 'N/A', manualork: '', opedue: 'dr' },
    { name: 'Computers installed with Windows & MS Office', quantity: '27', rto: '0.5 Hrs', justification: '', rpo: 'N/A', manualork: '', opedue: '' },
    { name: 'FortiClient VPN client', quantity: '27', rto: '0.5 Hrs', justification: '', rpo: 'N/A', manualork: '', opedue: '' },
    { name: 'Microsoft Teams', quantity: '27', rto: '0.5 Hrs', justification: '', rpo: 'N/A', manualork: '', opedue: '' },
    { name: 'Email Client', quantity: '27', rto: '0.5 Hrs', justification: '', rpo: 'N/A', manualork: '', opedue: '' },
    { name: 'Printer', quantity: '1', rto: '1.5 Hrs', justification: '', rpo: 'N/A', manualork: '', opedue: '' },
    { name: 'Fiber Broadband connection', quantity: '1', rto: '0.5 Hrs', justification: '', rpo: 'N/A', manualork: '', opedue: '' },
    { name: 'Intranet connectivity', quantity: '1', rto: '0.5 Hrs', justification: '', rpo: 'N/A', manualork: '', opedue: '' },
    { name: 'OSS Application Server', quantity: '2', rto: '1.0 Hrs', justification: '', rpo: '0.0 Hrs', manualork: '', opedue: '' },
    { name: 'OSS Database', quantity: '2', rto: '1.0 Hrs', justification: '', rpo: '4.0 Hrs', manualork: '', opedue: '' },
    { name: 'Seating capacity', quantity: '27', rto: '1.0 Hrs', justification: '', rpo: 'N/A', manualork: '', opedue: '' },
    { name: 'Vehicle for Transport', quantity: '1', rto: 'Immediately', justification: '', rpo: 'N/A', manualork: '', opedue: '' },
    { name: '', quantity: '', rto: '', justification: '', rpo: '', manualork: '', opedue: '' },
    { name: '', quantity: '', rto: '', justification: '', rpo: '', manualork: '', opedue: '' },
    { name: '', quantity: '', rto: '', justification: '', rpo: '', manualork: '', opedue: '' },
  ];

  return (
    <div className="middle-section">
      <Layout/>
      <div className="form-container">
        <h2>Resource Required</h2>

        <button className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>

        <div className="form-section">
          <table>
            <thead>
              <tr>		
                <th>Name</th>
                <th>Quantity</th>
                <th>RTO</th>
                <th>Justification</th>
                <th>RPO</th>
                <th>Manual Workaround</th>
                <th>Operational Duration</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.quantity}</td>
                  <td>{row.rto}</td>
                  <td>{row.justification}</td>
                  <td>{row.rpo}</td>
                  <td>{row.manualork}</td>
                  <td>{row.opedue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResourceRequired;