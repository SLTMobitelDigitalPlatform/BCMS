function DocumentControl() {
  const data = [
    { version: "1.0", description: "Initial Version", date: "10 Oct 2016" },
    { version: "2.0", description: "2018 review", date: "22 May 2018" },
    { version: "3.0", description: "2019 review", date: "20 May 2019" },
    { version: "4.0", description: "2020 review", date: "21 Aug 2020" },
    { version: "5.0", description: "2021 review", date: "" },
  ];

  return (
    <div>
      <div className="p-8 bg-blue-50 rounded-xl shadow-lg">
        <h1 className="text-xl font-bold text-[#52B14A] mb-6">
          Document Control
        </h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-200">
                <th className="border p-3">Version</th>
                <th className="border p-3">Description</th>
                <th className="border p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border p-3 text-center">{item.version}</td>
                  <td className="border p-3 text-center">{item.description}</td>
                  <td className="border p-3 text-center">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-200">
                <th className="border p-3">Document Name</th>
                <th className="border p-3">Reference Type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border p-3 text-center">{item.version}</td>
                  <td className="border p-3 text-center">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DocumentControl;
