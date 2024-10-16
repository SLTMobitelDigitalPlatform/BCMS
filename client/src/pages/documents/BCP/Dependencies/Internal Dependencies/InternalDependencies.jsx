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
  const [activeStream, setActiveStream] = useState("upstream");
  const [selectedCBFunction, setSelectedCBFunction] = useState(null);
  const { bcpid } = useParams();

  const { sortedCBFunctions, isLoading: loading } =
    useCriticalBusinessFunction(bcpid);

  useEffect(() => {
    if (location.state?.cbfid) {
      setSelectedCBFunction(location.state.cbfid);
    }
    if (location.state?.activeStream) {
      setActiveStream(location.state.activeStream);
    }
  }, [location.state]);

  // Handle select dropdown change
  const handleSelectChange = (selectedOption) => {
    setSelectedCBFunction(selectedOption);
    setActiveStream("upstream");

    navigate(location.pathname, {
      state: {
        activeStream: "upstream",
        cbfid: selectedOption,
        activeTab: "internalDependencies",
      },
    });
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveStream(tab);
  };

  // Handle creation logic for upstream or downstream
  const handleCreateRecord = () => {
    if (!selectedCBFunction) return;

    const createURL =
      activeStream === "upstream"
        ? `/createUpstream/${bcpid}`
        : `/createDownstream/${bcpid}`;
    navigate(createURL, {
      state: { cbfid: selectedCBFunction, activeStream },
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
          <>
            <div className="flex gap-5">
              <button
                className={`px-2 py-1 rounded font-semibold ${
                  activeStream === "upstream"
                    ? "doc-nav-active"
                    : "doc-nav-hover"
                }`}
                onClick={() => handleTabChange("upstream")}
              >
                Upstream
              </button>
              <button
                className={`px-2 py-1 rounded font-semibold ${
                  activeStream === "downstream"
                    ? "doc-nav-active"
                    : "doc-nav-hover"
                }`}
                onClick={() => handleTabChange("downstream")}
              >
                Downstream
              </button>
            </div>

            <button className="btn-primary" onClick={handleCreateRecord}>
              Create {activeStream === "upstream" ? "Upstream" : "Downstream"}{" "}
              Dependency
            </button>
          </>
        ) : (
          ""
        )}
      </div>
      {selectedCBFunction ? (
        <>
          {/* <div className="flex justify-between items-center my-5">
            <div className="flex gap-5">
              <button
                className={`px-2 py-1 rounded font-semibold ${
                  activeStream === "upstream"
                    ? "doc-nav-active"
                    : "doc-nav-hover"
                }`}
                onClick={() => handleTabChange("upstream")}
              >
                Upstream
              </button>
              <button
                className={`px-2 py-1 rounded font-semibold ${
                  activeStream === "downstream"
                    ? "doc-nav-active"
                    : "doc-nav-hover"
                }`}
                onClick={() => handleTabChange("downstream")}
              >
                Downstream
              </button>
            </div>

            <button className="btn-primary" onClick={handleCreateRecord}>
              Create {activeStream === "upstream" ? "Upstream" : "Downstream"}{" "}
              Dependency
            </button>
          </div> */}

          <div className="h-full w-full overflow-auto">
            {activeStream === "upstream" ? <Upstream /> : <Downstream />}
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
