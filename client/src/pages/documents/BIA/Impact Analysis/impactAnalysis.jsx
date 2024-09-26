import React, { useState }  from 'react';

// Tabs Component
const Tabs = () => {
  return (
    <div className="flex space-x-4 p-4 border-b">
      <button className="px-4 py-2 text-blue-600">
        Severity Level
      </button>
      <button className="px-4 py-2 text-blue-600">
        Impact Areas
      </button>
    </div>
  );
};

// Dropdown Component
const Dropdown = () => {
  return (
    <div className="">
      
    </div>
  );
};

// Main Component (Impact Areas)
const ImpactAreas = () => {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold mb-4">Impact Analysis</h1>
        <Tabs />
        <Dropdown />
        <ImpactAnalysisGrid />
        
      </div>
    );
  };