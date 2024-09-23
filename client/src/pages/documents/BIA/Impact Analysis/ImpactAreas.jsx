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

const ImpactAnalysisGrid = () => {
  const headers = [
    "30 Min", "1 Hour", "2 Hours", "4 Hours", "6 Hours", "8 Hours", 
    "12 Hours", "1 Day", "2 Days", "3 Days", "4 Days", "1 Week", 
    "2 Weeks", "3 Weeks", "4 Weeks", "6 Weeks", "8 Weeks", "12 Weeks", "24 Weeks"
  ];

  const categories = [
    {
      title: "Operational",
      rows: [
        "Human Lives and Safety",
        "Internal Business Processes",
        "Internal Customers",
        "External Customers",
        "Reputation"
      ],
      severityLevels: ["Insignificant", "Minor", "Moderate", "Major", "Severe"],
      colors: {
        Insignificant: "bg-green-200",
        Minor: "bg-yellow-200",
        Moderate: "bg-orange-300",
        Major: "bg-red-400",
        Severe: "bg-red-600",
      }
    },
    {
      title: "Financial",
      rows: [
        "Direct Revenue Loss",
        "Penalties / Fines"
      ],
      severityLevels: [
        "< Rs.1M", "Rs.1M - 10M", "Rs.10M - 100M", "Rs.100M - 500M", "> Rs.500M"
      ],
      colors: {
        "< Rs.1M": "bg-green-200",
        "Rs.1M - 10M": "bg-yellow-200",
        "Rs.10M - 100M": "bg-orange-300",
        "Rs.100M - 500M": "bg-red-400",
        "> Rs.500M": "bg-red-600",
      }
    },
    {
      title: "Legal and Regulatory Compliance",
      rows: [
        "Contractual/Legal Obligation",
        "Regulatory Compliance"
      ],
      severityLevels: ["Not Breached", "Breached"],
      colors: {
        "Not Breached": "bg-green-200",
        Breached: "bg-red-400"
      }
    }
  ];

  // State to track the selected values for each cell
  const [selectedValues, setSelectedValues] = useState({});

  // Handle dropdown change event
  const handleSelectChange = (rowIndex, colIndex, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [`${rowIndex}-${colIndex}`]: value
    }));
  };

  // Function to get background color based on the selected value and category
  const getCellBackgroundColor = (category, value) => {
    return category.colors[value] || "bg-white"; 
  };

  return (
    <div className="overflow-x-auto overflow-y-auto p-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-2 border-b text-left"></th> 
            <th className="px-6 py-2 border-b text-left">Impact Areas</th>
            {headers.map((header) => (
              <th key={header} className="px-6 py-2 border-b text-center">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              {category.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {rowIndex === 0 && (
                    <td
                      rowSpan={category.rows.length}
                      className="px-6 py-4 border-b font-semibold text-center"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {category.title}
                    </td>
                  )}
                  <td className="px-6 py-4 border-b">{row}</td>
                  {headers.map((_, colIndex) => {
                    const cellKey = `${categoryIndex}-${rowIndex}-${colIndex}`;
                    const selectedValue = selectedValues[cellKey] || "";

                    return (
                      <td
                        key={colIndex}
                        className={`border-b text-center ${getCellBackgroundColor(category, selectedValue)}`}
                      >
                        {/* Only show the dropdown if no value is selected */}
                        {selectedValue === "" ? (
                          <select
                            value={selectedValue}
                            onChange={(e) => handleSelectChange(`${categoryIndex}-${rowIndex}`, colIndex, e.target.value)}
                            className="form-select w-full h-8"
                          >
                            <option value="">Select</option>
                            {category.severityLevels.map((level) => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        ) : (
                          // Show nothing (just the background color) once a selection is made
                          <div
                            className="w-full h-8 cursor-pointer"
                            onClick={() => handleSelectChange(`${categoryIndex}-${rowIndex}`, colIndex, "")} 
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
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

export default ImpactAreas;
