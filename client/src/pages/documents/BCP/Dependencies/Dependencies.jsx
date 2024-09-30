import { Link, useLocation } from "react-router-dom";
import ExternalDependencies from "./ExternalDependencies";
import InternalDependencies from "./InternalDependencies";
import { useEffect, useState } from "react";

const Dependencies = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("internalDependencies");

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
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">Dependencies</h1>

        {/* Tab Navigation */}
        <div className="flex items-center gap-10">
          <button
            className={`px-2 py-1 rounded font-semibold ${
              activeTab === "internalDependencies"
                ? "doc-nav-active"
                : "doc-nav-hover"
            }`}
            onClick={() => handleTabChange("internalDependencies")}
          >
            Internal Dependencies
          </button>
          <button
            className={`px-2 py-1 rounded font-semibold ${
              activeTab === "externalDependencies"
                ? "doc-nav-active"
                : "doc-nav-hover"
            }`}
            onClick={() => handleTabChange("externalDependencies")}
          >
            External Dependencies
          </button>
        </div>

        {/* Create Record Button */}
        {activeTab === "internalDependencies" ? (
          <Link
            to="/createInternalDependencies"
            state={{ activeTab: "internalDependencies" }}
            className="btn-primary"
          >
            Create Internal Record
          </Link>
        ) : (
          <Link
            to="/createExternalDependencies"
            state={{ activeTab: "externalDependencies" }}
            className="btn-primary"
          >
            Create External Record
          </Link>
        )}
      </div>

      {/* Tab Content */}
      <div className="h-full w-full overflow-auto">
        {activeTab === "internalDependencies" ? (
          <InternalDependencies />
        ) : (
          <ExternalDependencies />
        )}
      </div>
    </div>
  );
};

export default Dependencies;
