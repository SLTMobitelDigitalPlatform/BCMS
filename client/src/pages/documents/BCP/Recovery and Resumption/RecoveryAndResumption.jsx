import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useCriticalBusinessFunction } from "../../../../hooks/documents/bcp/useCriticalBusinessFunction";
import RecoveryResumptionTable from "./RecoveryResumptionTable";

const RecoveryResumption = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bcpid } = useParams();
  const [selectedCBFunction, setSelectedCBFunction] = useState(null);

  const { sortedCBFunctions, isLoading: loading } =
    useCriticalBusinessFunction(bcpid);

  useEffect(() => {
    if (location.state?.cbfid) {
      setSelectedCBFunction(location.state.cbfid);
    }
  }, [location.state]);

  // Handler for selecting CBF from dropdown
  const handleSelectChange = (selectedOption) => {
    setSelectedCBFunction(selectedOption);

    navigate(location.pathname, {
      state: { cbfid: selectedOption },
    });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      <h1 className="text-xl font-bold text-indigo-900 mb-5">
        Recovery and Resumption
      </h1>
      <div className="flex justify-between items-center mb-5">
        <Select
          className="m-0.5 w-1/3 font-semibold"
          value={selectedCBFunction}
          onChange={handleSelectChange}
          options={sortedCBFunctions}
          placeholder="Select Critical Business Function"
          isSearchable={true}
          isClearable={true}
        />
        {selectedCBFunction ? (
          <Link
            to={`/createRecoveryResumption/${bcpid}`}
            state={{ cbfid: selectedCBFunction }}
            className="btn-primary font-semibold"
          >
            Add Details
          </Link>
        ) : (
          ""
        )}
      </div>
      {selectedCBFunction ? (
        <RecoveryResumptionTable />
      ) : (
        <p className="my-5 mx-2">Please select a critical business function.</p>
      )}
    </div>
  );
};

export default RecoveryResumption;
