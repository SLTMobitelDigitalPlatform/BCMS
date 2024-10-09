import { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-multi-carousel/lib/styles.css";
import { NavLink, useLocation, useParams } from "react-router-dom";

const BCPNavigation = () => {
  const tabs = [
    "BCP Form",
    "Document Control",
    "Related Documents",
    "Recovery Strategy",
    "Legal Requirements",
    "Pre-Incident Preparation",
    "Critical Business Function",
    "Recovery and Resumption",
    "Resources Required",
    "Dependencies",
    "Vital Records",
    "Work Area Recovery",
    "Manpower",
    "Embedded Documents",
  ];

  const tabContainerRef = useRef(null);
  const location = useLocation();
  const { bcpid } = useParams();

  // Scroll functions for left and right buttons
  const scrollLeft = () => {
    if (tabContainerRef.current) {
      tabContainerRef.current.scrollBy({
        left: -450,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (tabContainerRef.current) {
      tabContainerRef.current.scrollBy({
        left: 450,
        behavior: "smooth",
      });
    }
  };

  // Function to center the clicked tab
  const centerTab = (index) => {
    const container = tabContainerRef.current;
    const clickedTab = container.children[index];

    if (clickedTab && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = clickedTab.getBoundingClientRect();

      // Calculate the distance to center the clicked tab
      const offsetLeft = tabRect.left - containerRect.left;
      const scrollPosition =
        offsetLeft - containerRect.width / 2 + tabRect.width / 2;

      container.scrollBy({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Scroll to the active tab on initial load
  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) =>
      location.pathname.includes(tab.replace(/\s+/g, "-").toLowerCase())
    );

    if (activeIndex !== -1) {
      centerTab(activeIndex);
    }
  }, [location.pathname, tabs]);

  return (
    <div className="relative flex items-center w-full px-10">
      {/* Left Arrow */}
      <button
        className="absolute left-0 z-10 p-2 bg-indigo-600 hover:bg-indigo-800 rounded-full text-white focus:outline-none"
        onClick={scrollLeft}
      >
        <FaChevronLeft className="h-3.5 w-3.5" />
      </button>

      {/* Tabs Container */}
      <div
        ref={tabContainerRef}
        className="flex space-x-4 overflow-x-auto scroll-smooth tabslider-hide-scrollbar py-2 w-full"
      >
        {tabs.map((tab, index) => (
          <NavLink
            key={index}
            to={`/Business-Continuity-Plan/${tab
              .replace(/\s+/g, "-")
              .toLowerCase()}/${bcpid}`}
            onClick={() => centerTab(index)}
            className={({ isActive }) =>
              `whitespace-nowrap block px-2 py-1 rounded font-semibold text-sm ${
                isActive ? "doc-nav-active" : "doc-nav-hover"
              }`
            }
          >
            {tab}
          </NavLink>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-0 z-10 p-2 bg-indigo-600 hover:bg-indigo-800 rounded-full text-white focus:outline-none"
        onClick={scrollRight}
      >
        <FaChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default BCPNavigation;
