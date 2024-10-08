import React from 'react';
import '../css/DocumentControl.css';
import Layout from '../components/Layout';
import searchIcon from '../assets/search.png';

const DocumentControl = () => {
  const rows = [
    { version: '1.0', description: 'Initial Version', date: '10 Oct 2016' },
    { version: '2.0', description: '2018 Review', date: '22 May 2018' },
    { version: '3.0', description: '2019 Review', date: '20 May 2019' },
    { version: '4.0', description: '2020 Review', date: '21 Aug 2020' },
    { version: '5.0', description: '2021 Review', date: '' },
  ];

  const row2 = [
    { docname: '1.0', reftype: 'Initial Version' },
    { docname: '2.0', reftype: '2018 Review' },
    { docname: '3.0', reftype: '2019 Review' },
    { docname: '4.0', reftype: '2020 Review' },
    { docname: '5.0', reftype: '2021 Review' },
  ];

  return (
    <div className="middle-section">
      <Layout/>
      <div className="form-container">
        <h2>Document Control</h2>

        <button className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>

        <div className="form-section">
          <table>
            <thead>
              <tr>
                <th>Version</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.version}</td>
                  <td>{row.description}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-section">
          <table className='tb'>
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Reference Type</th>
              </tr>
            </thead>
            <tbody>
              {row2.map((row, index) => (
                <tr key={index}>
                  <td>{row.docname}</td>
                  <td>{row.reftype}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentControl;