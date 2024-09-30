import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Select from "react-select";
import Upstream from "./Upstream";
import Downstream from "./Downstream";

const InternalDependencies = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("upstream");

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      <Select
        className="mx-1 mb-5 w-1/3 font-semibold"
        // value={options.find((option) => option.value === activeTab)}
        // onChange={handleSelectChange}
        // options={options}
        placeholder="Select Option"
        isSearchable={false}
      />
      <div className="flex items-center mx-1  mb-5 gap-5">
        {/* Tab Navigation */}

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

      {/* Tab Content */}
      <div className="h-full w-full overflow-auto">
        {activeTab === "upstream" ? <Upstream /> : <Downstream />}
      </div>
    </div>
  );
};

export default InternalDependencies;
