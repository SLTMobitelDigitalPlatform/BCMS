import { Link, useLocation } from "react-router-dom";
import ExternalParty from "./ExternaParty";
import InternalParty from "./InternalParty";
import { useEffect, useState } from "react";

const InterestedParties = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("internalParty");

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
        <h1 className="text-xl font-bold text-indigo-900">
          Interested Parties
        </h1>

        {/* Tab Navigation */}
        <div className="flex items-center gap-10">
          <button
            className={`whitespace-nowrap p-1 rounded font-semibold ${
              activeTab === "internalParty" ? "doc-nav-active" : "doc-nav-hover"
            }`}
            onClick={() => handleTabChange("internalParty")}
          >
            Internal Party
          </button>
          <button
            className={`whitespace-nowrap p-1 rounded font-semibold ${
              activeTab === "externalParty" ? "doc-nav-active" : "doc-nav-hover"
            }`}
            onClick={() => handleTabChange("externalParty")}
          >
            External Party
          </button>
        </div>

        {/* Create Record Button */}
        {activeTab === "internalParty" ? (
          <Link
            to="/createInternalParty"
            state={{ activeTab: "internalParty" }}
            className="btn-primary font-semibold"
          >
            Create Internal Record
          </Link>
        ) : (
          <Link
            to="/createExternalParty"
            state={{ activeTab: "externalParty" }}
            className="btn-primary font-semibold"
          >
            Create External Record
          </Link>
        )}
      </div>

      {/* Tab Content */}
      <div className="h-full w-full overflow-auto">
        {activeTab === "internalParty" ? <InternalParty /> : <ExternalParty />}
      </div>
    </div>
  );
};

export default InterestedParties;
