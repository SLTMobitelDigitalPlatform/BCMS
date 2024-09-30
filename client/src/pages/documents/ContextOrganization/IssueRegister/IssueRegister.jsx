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
    <div className="pt-5 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">Issue Register</h1>

        {/* Tab Navigation */}
        <div className="flex items-center gap-10">
          <button
            className={`p-1 rounded font-semibold ${
              activeTab === "internal" ? "doc-nav-active" : "doc-nav-hover"
            }`}
            onClick={() => handleTabChange("internal")}
          >
            Internal Issues
          </button>
          <button
            className={`p-1 rounded font-semibold ${
              activeTab === "external" ? "doc-nav-active" : "doc-nav-hover"
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
            className="btn-primary"
          >
            Create Internal Record
          </Link>
        ) : (
          <Link
            to="/createExternalIssue"
            state={{ activeTab: "external" }}
            className="btn-primary"
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
