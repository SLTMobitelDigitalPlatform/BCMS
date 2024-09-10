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
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Interested Parties
        </h1>

        {/* Tab Navigation */}
        <div className="flex items-center gap-10">
          <button
            className={`px-2 py-1 rounded-lg text-white font-semibold ${
              activeTab === "internalParty"
                ? "bg-green-500"
                : "bg-indigo-900 hover:bg-indigo-600"
            }`}
            onClick={() => handleTabChange("internalParty")}
          >
            Internal Party
          </button>
          <button
            className={`px-2 py-1 rounded-lg text-white font-semibold ${
              activeTab === "externalParty"
                ? "bg-green-500"
                : "bg-indigo-900 hover:bg-indigo-600"
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
