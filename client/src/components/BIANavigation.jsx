import { useState } from "react";
import { Link } from "react-router-dom";

const BIANavigation = () => {
  // State to track the active (clicked) button
  const [activeButton, setActiveButton] = useState("");

  // Function to handle button clicks and set the active button
  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // Function to determine the button's styling based on whether it's active
  const getButtonClass = (buttonName) => {
    return activeButton === buttonName
      ? "px-2 py-1 border-2 border-[#52B14A] text-[#52B14A] font-semibold rounded-lg" // Green when clicked
      : "px-2 py-1 border-2 border-sky-600 text-sky-600 hover:text-[#52B14A] hover:border-[#52B14A] font-semibold rounded-lg"; // Default state
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-4">

        <Link to="/bia">
          <button
            className={getButtonClass("bia")}
            onClick={() => handleClick("bia")}
          >
            BIA Form
          </button>
        </Link>

        <Link to="/versions">
          <button
            className={getButtonClass("versions")}
            onClick={() => handleClick("versions")}
          >
            Document Versions
          </button>
        </Link>

        <Link to="/operatingSites">
          <button
            className={getButtonClass("operatingSites")}
            onClick={() => handleClick("operatingSites")}
          >
            Operating Sites
          </button>
        </Link>

        <Link to="/criticalBusiness">
          <button
            className={getButtonClass("criticalBusiness")}
            onClick={() => handleClick("criticalBusiness")}
          >
            Critical Business Functions
          </button>
        </Link>

        <Link to="/peaks&deadlines">
          <button
            className={getButtonClass("peaks&deadlines")}
            onClick={() => handleClick("peaks&deadlines")}
          >
            Business Peaks and Deadlines
          </button>
        </Link>

        <Link to="/resources">
          <button
            className={getButtonClass("resources")}
            onClick={() => handleClick("resources")}
          >
            Resources
          </button>
        </Link>

        <Link to="/impact">
          <button
            className={getButtonClass("impact")}
            onClick={() => handleClick("impact")}
          >
            Impact Analysis
          </button>
        </Link>

        <Link to="/resourcesRequired">
          <button
            className={getButtonClass("resourcesRequired")}
            onClick={() => handleClick("resourcesRequired")}
          >
            Resources Required
          </button>
        </Link>

      </div>
    </div>
  );
};

export default BIANavigation;
