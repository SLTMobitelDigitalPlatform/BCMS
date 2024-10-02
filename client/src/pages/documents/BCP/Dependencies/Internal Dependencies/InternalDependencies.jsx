import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useCriticalBusinessFunction } from "../../../../../hooks/documents/bcp/useCriticalBusinessFunction";
import Downstream from "./Downstream";
import Upstream from "./Upstream";

const InternalDependencies = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchCriticalBusinessFunctionsByBCPID(bcpid);
  }, []);

  // Handle select dropdown change
  const handleSelectChange = (selectedOption) => {
    setSelectedCBFunction(selectedOption);
    setActiveTab("upstream");
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle creation logic for upstream or downstream
  const handleCreateRecord = () => {
    if (!selectedCBFunction) return;

    // Redirect to the appropriate create record page based on activeTab
    const createURL =
      activeTab === "upstream" ? "/createUpstream" : "/createDownstream";
    navigate(createURL, {
      state: { cbFunction: selectedCBFunction, activeTab },
    });
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
        className="m-0.5 w-1/3 font-semibold"
        value={selectedCBFunction}
        onChange={handleSelectChange}
        options={sortedCBFunctions}
        placeholder="Select Critical Business Function"
        isSearchable={true}
        isClearable={true}
      />
      {/* Render tables and Create Record button if CBF is selected */}
      {selectedCBFunction ? (
        <>
          <div className="flex justify-between items-center my-5">
            {/* Tab Navigation */}
            <div className="flex gap-5">
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
                  activeTab === "downstream"
                    ? "doc-nav-active"
                    : "doc-nav-hover"
                }`}
                onClick={() => handleTabChange("downstream")}
              >
                Downstream
              </button>
            </div>

            {/* Create Record Button */}
            <button className="btn-primary" onClick={handleCreateRecord}>
              Create {activeTab === "upstream" ? "Upstream" : "Downstream"}{" "}
              Dependency
            </button>
          </div>

          {/* Tab Content (Upstream / Downstream Tables) */}
          <div className="h-full w-full overflow-auto">
            {activeTab === "upstream" ? (
              <Upstream cbFunction={selectedCBFunction} />
            ) : (
              <Downstream cbFunction={selectedCBFunction} />
            )}
          </div>
        </>
      ) : (
        <p className="my-5">Please select a critical business function.</p>
      )}
    </div>
  );
};

export default InternalDependencies;

{
  /* <div className="flex justify-between items-center mb-5 ">
        
        <div className="flex gap-5">
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

      
      <div className="h-full w-full overflow-auto">
        {!selectedCBFunction ? (
          <p>Please select a critical business function.</p>
        ) : activeTab === "upstream" ? (
          <Upstream cbFunction={selectedCBFunction} />
        ) : (
          <Downstream cbFunction={selectedCBFunction} />
        )}
      </div>
    </div> */
}
