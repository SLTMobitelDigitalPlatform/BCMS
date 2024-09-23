import React, { useState } from 'react';

const BiaImpactAnalysisAreas = () => {
  const impactAreas = [
    'Human Lives and Safety',
    'Internal Business Processes',
    'Internal Customers',
    'External Customers',
    'Reputation',
    'Financial / Fines',
    'Contracts/Legal Obligations',
    'Regulatory Compliance'
  ];

  const timePeriods = [
    '30 Min', '1 Hour', '4 Hours', '8 Hours', '12 Hours', '1 Day', '2 Days', '4 Days', '1 Week', '2 Weeks', '4 Weeks', '6 Weeks', '8 Weeks', '24 Weeks'
  ];

  const [colors, setColors] = useState({});

  const handleColorChange = (rowIndex, colIndex, color) => {
    setColors(prevColors => ({
      ...prevColors,
      [`${rowIndex}-${colIndex}`]: color
    }));
  };

  const getCellColor = (rowIndex, colIndex) => {
    return colors[`${rowIndex}-${colIndex}`] || 'transparent';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f4f4', padding: '20px' }}>
      {/* Header */}
      <div style={{ width: '100%', backgroundColor: '#ffffff', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
        <h2 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#666' }}>Business Impact Analysis</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={{ marginRight: '10px', border: 'none', backgroundColor: '#0061f2', color: '#fff', padding: '10px', borderRadius: '5px' }}>Add</button>
          <div style={{ backgroundColor: '#0061f2', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            N
          </div>
        </div>
      </div>

      {/* Impact Analysis Table */}
      <div style={{ width: '100%', marginTop: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', backgroundColor: '#f9f9f9' }}>Impact Areas</th>
              {timePeriods.map((period, index) => (
                <th key={index} style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', backgroundColor: '#f9f9f9' }}>{period}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {impactAreas.map((area, rowIndex) => (
              <tr key={rowIndex}>
                <td style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>{area}</td>
                {timePeriods.map((_, colIndex) => (
                  <td key={colIndex} style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: getCellColor(rowIndex, colIndex) }}>
                    <select
                      style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
                      value={colors[`${rowIndex}-${colIndex}`] || 'None'}
                      onChange={(e) => handleColorChange(rowIndex, colIndex, e.target.value)}
                    >
                      <option value="None">None</option>
                      <option value="Green">Green</option>
                      <option value="Yellow">Yellow</option>
                      <option value="Orange">Orange</option>
                      <option value="Red">Red</option>
                      <option value="Blue">Blue</option>
                      <option value="Purple">Purple</option>
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BiaImpactAnalysisAreas;
