import React, { useState } from 'react';
import ImpactAnalysisGrid from './impactArea';
import SeverityLevel from './severityLevel';

// Tabs Component
const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    // <div className="h-full w-full overflow-auto">
    //   <button
    //     className={`px-4 py-2 ${activeTab === 'severity' ? 'text-green-500' : 'text-gray-600'} font-semibold`}
    //     onClick={() => setActiveTab('severity')}
    //   >
    //     Severity Level
    //   </button>
    //   <button
    //     className={`px-4 py-2 ${activeTab === 'impact' ? 'text-green-500' : 'text-gray-600'} font-semibold`}
    //     onClick={() => setActiveTab('impact')}
    //   >
    //     Impact Areas
    //   </button>
    // </div>
    
      <div className="flex items-center gap-10 mb-8">
        <button
          className={`px-2 py-1 rounded font-semibold ${
            activeTab === "severity"
              ? "doc-nav-active"
              : "doc-nav-hover"
          }`}
          onClick={() => setActiveTab("severity")}
        >
          Severity Level
        </button>
        <button
          className={`px-2 py-1 rounded font-semibold ${
            activeTab === "impact"
              ? "doc-nav-active"
              : "doc-nav-hover"
          }`}
          onClick={() => setActiveTab("impact")}
        >
          Impact Areas
        </button>
      </div>
      
  );
};

// Main Component
const ImpactAnalysis = () => {
  const [activeTab, setActiveTab] = useState('severity');

  return (
    <div className="p-5 min-h-screen flex flex-col">
      {/* <h1 className="text-xl font-bold text-indigo-900">Impact Analysis</h1> */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto mb-100">
        {activeTab === 'severity' && <SeverityLevel />}
        {activeTab === 'impact' && <ImpactAnalysisGrid />}
      </div>
      
    </div>
  );
};

export default ImpactAnalysis;