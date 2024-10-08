import logo from './logo.svg';
import './App.css';


import React from 'react';



function App() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="icons">
          <button>Bcp Form</button>
          <button>Document Control</button>
          <button>Recovery Strategy</button>
          <button>Legal Requirments</button>
          <button>Pre-Incident preparation</button>
          <button>Critical Business function</button>
        </div>
        <BusinessContinuityPlanForm />
          
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div class="sidebar">
    <div class="sidebar-header">
        <h1>BCMS</h1>
        <p>Dashboard</p>
    </div>
    <ul class="sidebar-menu">
        <li>Employee</li>
       
        <li>Documents <span>&#9662;</span></li>
        
        <li>Meetings</li>
        <li>Calendar</li>
        <li>Risk Management</li>
        <li>Roles & Responsibilities</li>
    </ul>
    <button class="logout-button">Log Out</button>
</div>
  );
}

function Header() { 
  return (
    <div className="header">
      <input type="text" placeholder="Search" />
      <div className="icons">
        <span role="img" aria-label="Home"></span>
        <span role="img" aria-label="notification"></span>
        <span role="img" aria-label="user"></span>
      </div>
    </div>
  );
}

function BusinessContinuityPlanForm() {
  return (
    <div className="form">
      <h2>Business Continuity Plan</h2>
      <form>
        <label>Date:</label>
        <input type="date" />

        <label>Template:</label>
        <input type="text" placeholder="Enter Template Number" />

        <label>Legal Entity:</label>
        <select>
          <option>Select Legal Entity</option>
        </select>

        <label>Approver:</label>
        <select>
          <option>Select Owner</option>
        </select>

        <label>Maintainers:</label>
        <input type="text" placeholder="Enter the maintainers" />

        <label>Viewers:</label>
        <input type="text" placeholder="Enter the viewers" />

        <label>Date approved:</label>
        <input type="date" />

        <label>Date last reviewed:</label>
        <input type="date" />

        <label>Date Due for Next Review:</label>
        <input type="date" />

        <button type="submit">Submit</button>
      </form>
    </div>

  );
}

export default App;