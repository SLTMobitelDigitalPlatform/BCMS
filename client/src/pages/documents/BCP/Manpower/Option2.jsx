import { useState } from "react";

const Option2 = () => {
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
    <div className="overflow-auto">
      <table className="table-fixed w-full">
        <thead className="sticky bg-indigo-200">
          <tr>
            <th className="w-40 sticky doc-table-head">Site</th>
            {headers.map((header) => (
              <th key={header} className="w-20 doc-table-head text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="sticky left-0 p-4 h-16 doc-table-head whitespace-nowrap bg-indigo-100">
                {row}
              </td>
              {headers.map((_, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                const inputValue = inputValues[cellKey] || "";

                return (
                  <td
                    key={colIndex}
                    className="doc-table-data text-center"
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {editingCell === cellKey ? (
                      <input
                        type="number"
                        value={inputValue}
                        onChange={(e) =>
                          handleInputChange(rowIndex, colIndex, e.target.value)
                        }
                        onBlur={handleInputBlur}
                        className="form-input w-full h-8 bg-transparent text-center"
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

export default Option2;
