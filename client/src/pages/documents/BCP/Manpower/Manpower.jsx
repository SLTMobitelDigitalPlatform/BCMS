import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Select from "react-select";
import Option1 from "./Option1";
import Option2 from "./Option2";

const Manpower = () => {
  const location = useLocation();
  const { bcpid } = useParams();
  const [activeTab, setActiveTab] = useState("option1");

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const options = [
    { value: "option1", label: "Option 1 - Welikada DR Site" },
    { value: "option2", label: "Option 2 - WFH or Nearest SLT Office" },
  ];

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSelectChange = (selectedOption) => {
    handleTabChange(selectedOption.value);
  };

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      <h1 className="text-xl font-bold text-indigo-900 mb-5">
        Minimum Operating Requirements (Manpower)
      </h1>

      <Select
        className="mb-5 w-1/3 font-semibold"
        value={options.find((option) => option.value === activeTab)}
        onChange={handleSelectChange}
        options={options}
        placeholder="Select Option"
        isSearchable={false}
      />

      {/* Tab Content */}
      <div className="h-full w-full overflow-auto">
        {activeTab === "option1" ? <Option1 bcpid={bcpid} /> : <Option2 />}
      </div>
    </div>
  );
};

export default Manpower;
