import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useManpower } from "../../../../hooks/documents/bcp/useManpower";

const Option1 = () => {
  const { manpower, loading, fetchManpower, updateManpower } = useManpower();
  const { bcpid } = useParams();

  const [inputValues, setInputValues] = useState({});
  const [editingCell, setEditingCell] = useState(null);

  // Table headers and rows
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

  // Handle input change
  const handleInputChange = (rowIndex, colIndex, value) => {
    const numericValue = Number(value);
    const cellKey = `${rowIndex}-${colIndex}`;

    setInputValues((prev) => ({
      ...prev,
      [cellKey]: numericValue,
    }));
  };

  // Handle cell click to switch to input mode
  const handleCellClick = (rowIndex, colIndex) => {
    setEditingCell(`${rowIndex}-${colIndex}`);
  };

  // Handle blur (when the user clicks out of the input)
  const handleInputBlur = async () => {
    setEditingCell(null);
    try {
      await updateManpower(bcpid, "option1", inputValues);
    } catch (error) {
      console.error("Error updating manpower data:", error);
    }
  };

  useEffect(() => {
    fetchManpower(bcpid, "option1");
  }, []);

  useEffect(() => {
    if (manpower && manpower.tableData) {
      setInputValues(manpower.tableData);
    }
  }, [manpower]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <table className="table-fixed w-full">
        <thead className="sticky bg-indigo-200">
          <tr>
            <th className="w-20 sticky text-xs doc-table-head">Site</th>
            {headers.map((header) => (
              <th key={header} className="w-14 text-xs doc-table-head">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="sticky left-0 text-xs h-16 doc-table-head bg-indigo-100">
                {row}
              </td>
              {headers.map((_, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                const inputValue = inputValues[cellKey] || 0;

                return (
                  <td
                    key={colIndex}
                    className="doc-table-data text-center"
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {editingCell === cellKey ? (
                      <input
                        type="number"
                        value={inputValue === 0 ? "" : inputValue}
                        onChange={(e) =>
                          handleInputChange(rowIndex, colIndex, e.target.value)
                        }
                        onBlur={handleInputBlur}
                        className="form-input w-full h-8 bg-transparent text-center"
                        autoFocus
                      />
                    ) : (
                      <span>{inputValue}</span>
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

export default Option1;
