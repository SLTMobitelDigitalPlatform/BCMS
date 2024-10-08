import React from 'react';
import '../css/ResourceRequired.css';
import Layout from '../components/Layout';
import searchIcon from '../assets/search.png';

const VitalRecords = () => {
  const rows = [
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
    { name: '', description: '', options: '', locations: '', tpc: '', timereq: '', rrp: '', howfromwhere: '' },
  ];

  return (
    <div className="middle-section">
      <Layout/>
      <div className="form-container">
      <button className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>
        <h2>Vital Records</h2>

        <div className="form-section">
          <table>
            <thead>
              <tr>		
                <th>Name</th>
                <th>Description</th>
                <th>Options</th>
                <th>Locations</th>
                <th>Third Party Contact</th>
                <th>Time Required</th>
                <th>Record Recovery <br/>Point</th>
                <th>If this record can be re-created, state how <br/>
                and from where</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                  <td>{row.options}</td>
                  <td>{row.locations}</td>
                  <td>{row.tpc}</td>
                  <td>{row.timereq}</td>
                  <td>{row.rrp}</td>
                  <td>{row.howfromwhere}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VitalRecords;