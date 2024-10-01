import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import Select from "react-select";
import { useCriticalBusinessFunction } from "../../../../../hooks/documents/bcp/useCriticalBusinessFunction";
import Downstream from "./Downstream";
import Upstream from "./Upstream";

const InternalDependencies = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("upstream");
  const [selectedCBFunction, setSelectedCBFunction] = useState(null);
  const { bcpid } = useParams();

  const { sortedCBFunctions, loading, fetchCriticalBusinessFunctionsByBCPID } =
    useCriticalBusinessFunction();

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchCriticalBusinessFunctionsByBCPID(bcpid);
  }, []);

  // Handle select dropdown change
  const handleSelectChange = (selectedOption) => {
    setSelectedCBFunction(selectedOption);
    console.log(selectedOption);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col">
      <Select
        className="mx-1 mt-1 mb-5 w-1/3 font-semibold"
        value={selectedCBFunction}
        onChange={handleSelectChange}
        options={sortedCBFunctions}
        placeholder="Select Critical Business Function"
        isSearchable={false}
      />
      <div className="flex justify-between items-center mb-5 ">
        {/* Tab Navigation */}
        <div className="flex mx-1 gap-5">
          <button
            className={`px-2 py-1 rounded font-semibold ${
              activeTab === "upstream" ? "doc-nav-active" : "doc-nav-hover"
            }`}
            onClick={() => handleTabChange("upstream")}
          >
            Upstream
          </button>
          <button
            className={`px-2 py-1 rounded font-semibold ${
              activeTab === "downstream" ? "doc-nav-active" : "doc-nav-hover"
            }`}
            onClick={() => handleTabChange("downstream")}
          >
            Downstream
          </button>
        </div>
        <Link
          to="/createInternalDependencies"
          state={{ activeTab: "internalDependencies" }}
          className="btn-primary"
        >
          Create Internal Dependency
        </Link>
      </div>

      {/* Tab Content */}
      <div className="h-full w-full overflow-auto">
        {!selectedCBFunction ? (
          <p>Please select a critical business function.</p>
        ) : activeTab === "upstream" ? (
          <Upstream cbFunction={selectedCBFunction} />
        ) : (
          <Downstream cbFunction={selectedCBFunction} />
        )}
      </div>
    </div>
  );
};

export default InternalDependencies;
