import React, { useState } from 'react';
import ImpactAnalysisGrid from './impactArea';
import SeverityLevel from './severityLevel';

// Tabs Component
const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-4 p-4 border-b">
      <button
        className={`px-4 py-2 ${activeTab === 'severity' ? 'text-blue-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('severity')}
      >
        Severity Level
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'impact' ? 'text-blue-600' : 'text-gray-600'}`}
        onClick={() => setActiveTab('impact')}
      >
        Impact Areas
      </button>
    </div>
  );
};

// Dropdown Component
const Dropdown = () => {
  return (
    <div className="">
      {/* Dropdown content */}
    </div>
  );
};

// Main Component
const ImpactAnalysis = () => {
  const [activeTab, setActiveTab] = useState('severity');

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Impact Analysis</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'severity' && <SeverityLevel />}
      {activeTab === 'impact' && <ImpactAnalysisGrid />}
      
    </div>
  );
};

export default ImpactAnalysis;