import React from 'react';
import '../css/RecoveryStrategy.css';
import Layout from '../components/Layout';
import searchIcon from '../assets/search.png';

const RecoveryStrategy = () => {
  const rows = [
    { pos: '', rtas: '', oo: '' },
    { pos: '', rtas: '', oo: '' },
    { pos: '', rtas: '', oo: '' },
    { pos: '', rtas: '', oo: '' },
  ];
  return (
    <div className="middle-section">
      <Layout/>
      <div className="form-container">
        <button className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>
        <h2>Recovery Strategy</h2>
        <div className="form-section">
          <table>
            <thead>
              <tr>
                <th>Primary Operating Site</th>
                <th>Relocate to (Alternate Site)</th>
                <th>Outsource Options</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.pos}</td>
                  <td>{row.rtas}</td>
                  <td>{row.oo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecoveryStrategy;