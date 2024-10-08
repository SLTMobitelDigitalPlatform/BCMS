import React from 'react';
import '../css/MPR.css';
import Layout from '../components/Layout';
import searchIcon from '../assets/search.png';

const MPRWelikada = () => {
  const rows = [
    {site: 'Welikada (Co-shared)', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},
    {site: 'ALT - Work from Home (Dedicated)', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},
    {site: 'Recovery Staff Total', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},
    {site: 'Recovery Staff %', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},
    {site: 'Non Critical Staff', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},
    {site: 'Total Staff', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},
    {site: '', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},
    {site: '', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},
    {site: '', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},
    {site: '', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},
    {site: '', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},
    {site: '', hmin: '', h: '', th: '', fh: '', sh: '', eh: '', twh: '', od: '', td: '', thd: '', fd: '', ow: '', tw: '', thw: '', fw: '', sw: '', ew: '', ew2: '', tfw: ''},

  ];

  return (
    <div className="middle-section">
      <Layout/>
      <div className="form-container">
      <button className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>
        <h2>Minimum Operating Requirements (Manpower)</h2>

        <div className="form-section">
          <h3 className='titleopt'>Option 1 - Welikada DR Site</h3>
          <table>
            <thead>
              <tr>		
                <th>Site</th>
                <th>30 Min</th>
                <th>1 Hour</th>
                <th>2 Hours</th>
                <th>4 Hours</th>
                <th>6 Hours</th>
                <th>8 Hours</th>
                <th>12 Hours</th>
                <th>1 Day</th>
                <th>2 Days</th>
                <th>3 Days</th>
                <th>4 Days</th>
                <th>1 Week</th>
                <th>2 Weeks</th>
                <th>3 Weeks</th>
                <th>4 Weeks</th>
                <th>6 Weeks</th>
                <th>8 Weeks</th>
                <th>8 Weeks</th>
                <th>24 Weeks</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.site}</td>
                  <td>{row.hmin}</td>
                  <td>{row.h}</td>
                  <td>{row.th}</td>
                  <td>{row.fh}</td>
                  <td>{row.sh}</td>
                  <td>{row.eh}</td>
                  <td>{row.twh}</td>
                  <td>{row.od}</td>
                  <td>{row.td}</td>
                  <td>{row.thd}</td>
                  <td>{row.fd}</td>
                  <td>{row.ow}</td>
                  <td>{row.tw}</td>
                  <td>{row.thw}</td>
                  <td>{row.fw}</td>
                  <td>{row.sw}</td>
                  <td>{row.ew}</td>
                  <td>{row.ew2}</td>
                  <td>{row.tfw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MPRWelikada;