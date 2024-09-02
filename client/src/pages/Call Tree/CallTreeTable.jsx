import CallTreeGraph from "./CallTreeGraph";

const CallTreeTable = () => {
  const data = [
    {
      id: 1,
      name: "John",
      toCall: ["Jane", "Mark"],
    },
    {
      id: 2,
      name: "Jane",
      toCall: ["Jack", "George"],
    },
    {
      id: 3,
      name: "Mark",
      toCall: ["Steve", "Ben"],
    },
  ];
  return (
    <div>
      <table className="table-fixed w-full min-w-full bg-white border border-green-500">
        <thead className="bg-indigo-800 text-white">
          <tr>
            <th className="p-1 border border-green-500">ID</th>
            <th className="p-1 border border-green-500">Name</th>
            <th className="p-1 border border-green-500">To Call</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-green-500 p-1 text-blue-900 text-sm">
              1
            </td>
            <td className="border border-green-500 p-1 text-blue-900 text-sm">
              John
            </td>
            <td className="border border-green-500 p-1 text-blue-900 text-sm">
              Jane, Mark
            </td>
          </tr>
          <tr>
            <td className="border border-green-500 p-1 text-blue-900 text-sm">
              2
            </td>
            <td className="border border-green-500 p-1 text-blue-900 text-sm">
              Jane
            </td>
            <td className="border border-green-500 p-1 text-blue-900 text-sm">
              Jack, George
            </td>
          </tr>
          <tr>
            <td className="border border-green-500 p-1 text-blue-900 text-sm">
              3
            </td>
            <td className="border border-green-500 p-1 text-blue-900 text-sm">
              Mark
            </td>
            <td className="border border-green-500 p-1 text-blue-900 text-sm">
              Steve, Ben
            </td>
          </tr>
        </tbody>
      </table>
      {/* <CallTreeGraph data={data} /> */}
    </div>
  );
};

export default CallTreeTable;
