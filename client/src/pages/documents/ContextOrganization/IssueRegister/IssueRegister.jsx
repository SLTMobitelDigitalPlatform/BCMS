import { Link, useLocation } from "react-router-dom";
import ExternalIssues from "./ExternalIssues";
import InternalIssues from "./InternalIssues";
import { useEffect, useState } from "react";

const IssueRegister = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("internal");

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
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">Issue Register</h1>

        {/* Tab Navigation */}
        <div className="flex items-center gap-10">
          <button
            className={`px-2 py-1 rounded-lg text-white font-semibold ${
              activeTab === "internal"
                ? "bg-green-500"
                : "bg-indigo-900 hover:bg-indigo-600"
            }`}
            onClick={() => handleTabChange("internal")}
          >
            Internal Issues
          </button>
          <button
            className={`px-2 py-1 rounded-lg text-white font-semibold ${
              activeTab === "external"
                ? "bg-green-500"
                : "bg-indigo-900 hover:bg-indigo-600"
            }`}
            onClick={() => handleTabChange("external")}
          >
            External Issues
          </button>
        </div>

        {/* Create Record Button */}
        {activeTab === "internal" ? (
          <Link
            to="/createInternalIssue"
            state={{ activeTab: "internal" }}
            className="btn-primary font-semibold"
          >
            Create Internal Record
          </Link>
        ) : (
          <Link
            to="/createExternalIssue"
            state={{ activeTab: "external" }}
            className="btn-primary font-semibold"
          >
            Create External Record
          </Link>
        )}
      </div>

      {/* Tab Content */}
      <div className="h-full w-full overflow-auto">
        {activeTab === "internal" ? <InternalIssues /> : <ExternalIssues />}
      </div>
    </div>
  );
};

export default IssueRegister;
