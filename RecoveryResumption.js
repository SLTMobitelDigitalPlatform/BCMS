import React from 'react';
import { Link } from 'react-router-dom';
import '../css/RecoveryResumption.css';
import Layout from '../components/Layout';

const RecoveryResumption = () => {
  const rows = [
    { description: '1', timing: '', duration: '', role: '', incidentActions: '', incidentComments: '' },
    { description: '1.1', timing: '', duration: '', role: '', incidentActions: '', incidentComments: '' },
    { description: '1.2', timing: '', duration: '', role: '', incidentActions: '', incidentComments: '' },
    { description: '2', timing: '', duration: '', role: '', incidentActions: '', incidentComments: '' },
  ];

  return (
    <div className="middle-section">
      <Layout/>
      <div className="form-container">
        <h2>Recovery and Resumption of Critical Business Functions</h2>
        <div className="form-section">
          <h2 className='subtitle'>XXX</h2>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Timing</th>
                <th>Duration</th>
                <th>Role</th>
                <th>At Time of Incident Actions</th>
                <th>At Time of Incident Comments</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.description}</td>
                  <td>{row.timing}</td>
                  <td>{row.duration}</td>
                  <td>{row.role}</td>
                  <td>{row.incidentActions}</td>
                  <td>{row.incidentComments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-section">
        <h2 className='subtitle'>YYY</h2>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Timing</th>
                <th>Duration</th>
                <th>Role</th>
                <th>At Time of Incident Actions</th>
                <th>At Time of Incident Comments</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.description}</td>
                  <td>{row.timing}</td>
                  <td>{row.duration}</td>
                  <td>{row.role}</td>
                  <td>{row.incidentActions}</td>
                  <td>{row.incidentComments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecoveryResumption;
