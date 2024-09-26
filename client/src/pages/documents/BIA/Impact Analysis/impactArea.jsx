import React, { useState }  from 'react';

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
        "Breached": "bg-red-400"
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
    <div className="h-screen overflow-auto pb-80">
      <table className="table-fixed relative p-20">
        <thead className="text-white sticky top-0 ">
          <tr>
            <th className="w-20 doc-table-border sticky left-0 bg-indigo-800"></th> 
            <th className="doc-table-border sticky left-24 bg-indigo-800 ">Impact Areas</th>
            {headers.map((header) => (
              <th key={header} className="w-16 px-6 py-2 border-b text-center bg-indigo-800">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              {category.rows.map((row, rowIndex) => (
                <tr key={rowIndex} >
                  {rowIndex === 0 && (
                    <td 
                      rowSpan={category.rows.length}
                      className="sticky left-0 bg-indigo-100 px-6 py-4 border-b font-semibold text-center whitespace-pre-wrap "
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {category.title === "Legal and Regulatory Compliance"
                        ? "Legal and\nRegulatory Compliance"
                        : category.title}
                    </td>
                  )}
                  <td className="sticky left-24 h-24 px-6 py-4 border-b bg-cyan-50">{row}</td>
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
                            <option value=""></option>
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

export default ImpactAnalysisGrid;
