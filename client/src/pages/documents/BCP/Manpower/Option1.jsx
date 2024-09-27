import { useEffect, useState } from "react";
import { useManpower } from "../../../../hooks/documents/bcp/useManpower";
import { FaSpinner } from "react-icons/fa";

const Option1 = ({ bcpid }) => {
  const { manpower, loading, fetchManpower, updateManpower } = useManpower();

  const [inputValues, setInputValues] = useState({});
  const [editingCell, setEditingCell] = useState(null);

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

  // Load manpower data for option1 on component mount
  useEffect(() => {
    fetchManpower(bcpid, "option1");
  }, [bcpid]);

  // // State to track the input values for each cell
  // const [inputValues, setInputValues] = useState({});
  // const [editingCell, setEditingCell] = useState(null);

  // // Handle input change event
  // const handleInputChange = (rowIndex, colIndex, value) => {
  //   setInputValues((prev) => ({
  //     ...prev,
  //     [`${rowIndex}-${colIndex}`]: value,
  //   }));
  // };

  // Populate the input values when manpower data is fetched
  useEffect(() => {
    if (manpower?.tableData) {
      const initialValues = {};
      manpower.tableData.rows.forEach((row, rowIndex) => {
        row.values.forEach((value, colIndex) => {
          initialValues[`${rowIndex}-${colIndex}`] = value;
        });
      });
      setInputValues(initialValues);
    }
  }, [manpower]);

  // Save updates when input is changed
  // const handleInputChange = (rowIndex, colIndex, value) => {
  //   const updatedTableData = { ...manpower.tableData };
  //   updatedTableData.rows[rowIndex].values[colIndex] = value;

  //   updateManpower(bcpid, "option1", updatedTableData);
  // };

  // Save updates when input is changed
  const handleInputChange = (rowIndex, colIndex, value) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    setInputValues((prev) => ({
      ...prev,
      [cellKey]: value,
    }));

    // Prepare updated data to send
    const updatedTableData = { ...manpower.tableData };
    updatedTableData.rows[rowIndex].values[colIndex] = value;

    updateManpower(bcpid, "option1", updatedTableData);
  };

  // Handle cell click to switch to input mode
  const handleCellClick = (rowIndex, colIndex) => {
    setEditingCell(`${rowIndex}-${colIndex}`);
  };

  // Handle blur (when the user clicks out of the input)
  const handleInputBlur = () => {
    setEditingCell(null);
  };

  // // Handle cell click to switch to input mode
  // const handleCellClick = (rowIndex, colIndex) => {
  //   setEditingCell(`${rowIndex}-${colIndex}`);
  // };

  // // Handle blur (when the user clicks out of the input)
  // const handleInputBlur = () => {
  //   setEditingCell(null);
  // };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

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

export default Option1;
