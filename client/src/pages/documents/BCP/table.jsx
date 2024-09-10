const Table = () => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg relative shadow-lg">
      <h2 className="text-[#52B14A] text-lg font-bold mb-4">
        Legal Regulatory & Contractual Requirements
      </h2>
      <br></br>
      <button className="absolute top-6 right-6 bg-gradient-to-r from-[#003E81] to-[#52B14A] text-white px-4 py-2 rounded shadow">
        Add Details
      </button>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr>
            <th className="border border-green-500 bg-blue-100 px-4 py-2">
              Name of Organization
            </th>
            <th className="border border-green-500 bg-blue-100 px-4 py-2">
              Legal, Regulatory & Contractual Requirements
            </th>
            <th className="border border-green-500 bg-blue-100 px-4 py-2">
              Monitored By
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-green-500 px-4 py-2 font-bold">
              SLT - Galle HQ
            </td>
            <td className="border border-green-500 px-4 py-2"></td>
            <td className="border border-green-500 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-green-500 px-4 py-2 font-bold">
              Organization 2
            </td>
            <td className="border border-green-500 px-4 py-2"></td>
            <td className="border border-green-500 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-green-500 px-4 py-2 font-bold">
              Organization 3
            </td>
            <td className="border border-green-500 px-4 py-2"></td>
            <td className="border border-green-500 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-green-500 px-4 py-2 font-bold">
              Organization 4
            </td>
            <td className="border border-green-500 px-4 py-2"></td>
            <td className="border border-green-500 px-4 py-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
