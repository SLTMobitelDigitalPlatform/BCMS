import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useExternalDependencies } from "../../../../hooks/documents/bcp/useExternalDependencies";
import { FaSpinner } from "react-icons/fa";
import { useCriticalBusinessFunction } from "../../../../hooks/documents/bcp/useCriticalBusinessFunction";

const ExternalDependencies = () => {
  const {
    externalDependencies,
    loading: loadingED,
    fetchExternalDependenciesByBCPID,
  } = useExternalDependencies();

  const {
    criticalBusinessFunctions,
    loading: loadingCBF,
    fetchCriticalBusinessFunctionsByBCPID,
  } = useCriticalBusinessFunction();

  const { bcpid } = useParams();

  useEffect(() => {
    fetchCriticalBusinessFunctionsByBCPID(bcpid);
    fetchExternalDependenciesByBCPID(bcpid);
  }, []);

  const handleDelete = async (id) => {};

  const getCBFName = (id) => {
    const cbf = criticalBusinessFunctions.find((cbf) => cbf._id === id);
    return cbf ? cbf.name : "Unknown CBF";
  };

  if (loadingCBF || loadingED)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-52 doc-table-head">
                Critical Business Function
              </th>
              <th className="doc-table-head">Organization</th>
              <th className="w-32 doc-table-head">Dependencies</th>
              <th className="w-32 doc-table-head">Primary Contact</th>
              <th className="w-32 doc-table-head">Secondary Contact</th>
              <th className="w-32 doc-table-head">Justification</th>
              <th className="w-32 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {externalDependencies.map((external) => (
              <tr key={external._id} className="doc-table-hover">
                <td className="py-2 px-4 doc-table-data">
                  {getCBFName(external.criticalBusinessFunction)}
                </td>
                <td className="py-2 px-4 doc-table-data">
                  {external.organization}
                </td>
                <td className="py-2 px-4 doc-table-data">
                  {external.dependencies}
                </td>
                <td className="py-2 px-4 doc-table-data">
                  {external.primaryContact}
                </td>
                <td className="py-2 px-4 doc-table-data">
                  {external.secondaryContact}
                </td>
                <td className="py-2 px-4 doc-table-data">
                  {external.justification}
                </td>

                <td className="py-2 px-4 w-32 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editExternalDependencies/${external._id}`}
                      state={{ activeTab: "externalDependencies" }}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="doc-delete-btn"
                      onClick={() => handleDelete(external._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExternalDependencies;
