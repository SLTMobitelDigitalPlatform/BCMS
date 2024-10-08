import React, { useState } from 'react';
import '../css/RecoveryStrategy.css';
import Layout from '../components/Layout';
import searchIcon from '../assets/search.png';

const GrabList = () => {
  const personResponsibleOptions = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'];

  const [rows, setRows] = useState([
    { no: 'E005', description: '', responsible: 'John Doe', location: '', owner: '' },
  ]);

  const handlePersonChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].responsible = event.target.value;
    setRows(updatedRows);
  };

  return (
    <div className="middle-section">
      <Layout />
      <div className="form-container">
        <button className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>
        <h2>Embedded List / Grab List</h2>
        <div className="table-header">
          <p> </p>
          <button className="add-plan-btn">Add Details</button>
        </div>

        <div className="form-section">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Description of Item</th>
                <th>Person Responsible</th>
                <th>Physical Location of Item</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.no}</td>
                  <td>{row.description}</td>
                  <td>
                  <select
                    value={row.responsible}
                    onChange={(event) => handlePersonChange(index, event)}
                  >
                    {personResponsibleOptions.map((person, i) => (
                      <option key={i} value={person}>
                        {person}
                      </option>
                    ))}
                  </select>

                  </td>
                  <td>{row.location}</td>
                  <td>{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GrabList;
