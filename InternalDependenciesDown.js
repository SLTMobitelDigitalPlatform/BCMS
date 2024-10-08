import React, { useState } from 'react';
import '../css/InternalDependencies.css';
import Layout from '../components/Layout';
import searchIcon from '../assets/search.png';

const InternalDependenciesDown = () => {
  const [view, setView] = useState('internal'); // Controls which tab is active
  const [direction, setDirection] = useState('upstream'); // Controls Upstream/Downstream
  const [selectedFunction, setSelectedFunction] = useState('');

  const rows = [
    { organization: 'SLT-Galle HQ', forWhat: '', primaryContact: '', secondaryContact: '', rto: '', justification: '', options: '' },
    { organization: '', forWhat: '', primaryContact: '', secondaryContact: '', rto: '', justification: '', options: '' },
    { organization: '', forWhat: '', primaryContact: '', secondaryContact: '', rto: '', justification: '', options: '' },
    { organization: '', forWhat: '', primaryContact: '', secondaryContact: '', rto: '', justification: '', options: '' },
  ];

  const extrows = [
    { cbf: 'xxxx', organization: 'SLT-Galle HQ', dependencies: '', pc: '', sc: '', justification: '' },
    { cbf: 'yyyy', organization: '', dependencies: '', pc: '', sc: '', justification: '' },
    { cbf: '', organization: '', dependencies: '', pc: '', sc: '', justification: '' },
  ];

  return (
    <div className="middle-section">
      <Layout />
      <div className="form-container">
        {/* Tabs for Internal and External Dependencies */}
        <div className="tabs">
          <button onClick={() => setView('external')} className={`tab ${view === 'external' ? 'active' : ''}`}>
            External Dependencies
          </button>
          <button onClick={() => setView('internal')} className={`tab ${view === 'internal' ? 'active' : ''}`}>
            Internal Dependencies
          </button>
        </div>

        {view === 'internal' ? (
          <>
            <h2 className='tabselecttitle'>Internal Dependencies</h2>

            <div className="dropdown-section">
              <select
                id="critical-function"
                value={selectedFunction}
                onChange={(e) => setSelectedFunction(e.target.value)}
              >
                <option value="">Select Critical Business Function</option>
                <option value="function1">Function 1</option>
                <option value="function2">Function 2</option>
              </select>
            </div>

            <div className="buttons-section">
              <button
                onClick={() => setDirection('upstream')}
                className={`direction-button ${direction === 'upstream' ? 'active' : ''}`}
              >
                Upstream
              </button>
              <button
                onClick={() => setDirection('downstream')}
                className={`direction-button ${direction === 'downstream' ? 'active' : ''}`}
              >
                Downstream
              </button>
            </div>

            <button className="search-button">
              <img src={searchIcon} alt="Search" />
            </button>

            {direction === 'upstream' ? (
              <div className="upstream-message">
                <div className="table-section">
                  <div className="table-header">
                    <p>Upstream Dependencies</p>
                    <button className="add-plan-btn">Add Details</button>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Name of Organization</th>
                        <th>For What</th>
                        <th>Primary Contact</th>
                        <th>Secondary Contact</th>
                        <th>RTO</th>
                        <th>Justification</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={index}>
                          <td>{row.organization}</td>
                          <td>{row.forWhat}</td>
                          <td>{row.primaryContact}</td>
                          <td>{row.secondaryContact}</td>
                          <td>{row.rto}</td>
                          <td>{row.justification}</td>
                          <td>{row.options}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="table-section">
                <div className="table-header">
                  <p>Downstream Dependencies</p>
                  <button className="add-plan-btn">Add Details</button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Name of Organization</th>
                      <th>For What</th>
                      <th>Primary Contact</th>
                      <th>Secondary Contact</th>
                      <th>RTO</th>
                      <th>Justification</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td>{row.organization}</td>
                        <td>{row.forWhat}</td>
                        <td>{row.primaryContact}</td>
                        <td>{row.secondaryContact}</td>
                        <td>{row.rto}</td>
                        <td>{row.justification}</td>
                        <td>{row.options}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className='tabselecttitle'>External Dependencies</h2>
            <button className="search-button">
              <img src={searchIcon} alt="Search" />
            </button>
            <div className="upstream-message">
            <div className="table-section">
            <div className="table-header">
            <p> </p>
            <button className="add-plan-btn">Add Details</button>
        </div>
            <table>
              <thead>
                <tr>
                  <th>Critical Business Function</th>
                  <th>Organization</th>
                  <th>Dependencies</th>
                  <th>Primary Contact</th>
                  <th>Secondary Contact</th>
                  <th>Justification</th>
                </tr>
              </thead>
              <tbody>
                {extrows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.cbf}</td>
                    <td>{row.organization}</td>
                    <td>{row.dependencies}</td>
                    <td>{row.pc}</td>
                    <td>{row.sc}</td>
                    <td>{row.justification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InternalDependenciesDown;
