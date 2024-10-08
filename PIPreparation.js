import React from 'react';
import '../css/RecoveryStrategy.css';
import Layout from '../components/Layout';

const PIPreparation = () => {
  const rows = [
    { pimes: '', frqsch: '', frqschRes: '' },
    { pimes: '', frqsch: '', frqschRes: '' },
    { pimes: '', frqsch: '', frqschRes: '' },
    { pimes: '', frqsch: '', frqschRes: '' },
  ];
  return (
    <div className="middle-section">
      <Layout/>
      <div className="form-container">
        <h2>Pre-Incident Preparation</h2>

        <div className="form-section">
          <table>
            <thead>
              <tr>
                <th>Pre-Incident <br/>Measures</th>
                <th>Frequency / Schedule</th>
                <th>Frequency / Schedule <br/> Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.pimes}</td>
                  <td>{row.frqsch}</td>
                  <td>{row.frqschRes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PIPreparation;