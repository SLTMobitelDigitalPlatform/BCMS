import { useState } from "react";

const ImpactAnalysisGrid = () => {
  const headers = [
    "30 Min",
    "1 Hour",
    "2 Hours",
    "4 Hours",
    "6 Hours",
    "8 Hours",
    "12 Hours",
    "1 Day",
    "2 Days",
    "3 Days",
    "4 Days",
    "1 Week",
    "2 Weeks",
    "3 Weeks",
    "4 Weeks",
    "6 Weeks",
    "8 Weeks",
    "12 Weeks",
    "24 Weeks",
  ];

  const rows = [
    "Recovery Staff Total",
    "Recovery Staff %",
    "Non-Critical Staff",
    "Total Staff",
  ];

  // State to track the input values for each cell
  const [inputValues, setInputValues] = useState({});
  const [editingCell, setEditingCell] = useState(null);

  // Handle input change event
  const handleInputChange = (rowIndex, colIndex, value) => {
    setInputValues((prev) => ({
      ...prev,
      [`${rowIndex}-${colIndex}`]: value,
    }));
  };

  // Handle cell click to switch to input mode
  const handleCellClick = (rowIndex, colIndex) => {
    setEditingCell(`${rowIndex}-${colIndex}`);
  };

  // Handle blur (when the user clicks out of the input)
  const handleInputBlur = () => {
    setEditingCell(null);
  };

  return (
    <div className="overflow-x-auto pb-40">
      <table className="table-fixed relative min-w-max p-20 border-collapse border border-indigo-100">
        <thead className="sticky text-white h-16">
          <tr>
            <th className="w-36 sticky left-0 bg-indigo-800 border-indigo-100">
              Site
            </th>
            {headers.map((header) => (
              <th
                key={header}
                className="w-20 border border-indigo-100 text-center bg-indigo-800"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="sticky left-0 h-24 px-6 py-4 border border-indigo-100 bg-indigo-100">
                {row}
              </td>
              {headers.map((_, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                const inputValue = inputValues[cellKey] || "";

                return (
                  <td
                    key={colIndex}
                    className="border border-indigo-100 text-center"
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {editingCell === cellKey ? (
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) =>
                          handleInputChange(rowIndex, colIndex, e.target.value)
                        }
                        onBlur={handleInputBlur}
                        className="form-input w-full h-8 bg-transparent"
                        autoFocus
                      />
                    ) : (
                      <span>{inputValue || ""}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Component (Impact Areas)
const Manpower = () => {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">
        Minimum Operating Requirements - Manpower/Manpower
      </h1>
      <ImpactAnalysisGrid />
    </div>
  );
};

export default Manpower;
