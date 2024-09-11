import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BCPNavigation = () => {
  const scrollContainerRef = useRef(null);

  // Function to scroll to a specific tab
  const scrollToTab = (tabIndex) => {
    const tabWidth = 150; // adjust this value to match your tab width
    const containerWidth = scrollContainerRef.current.offsetWidth;
    const tabOffset = tabIndex * tabWidth;
    const centerX = containerWidth / 2;
    const currentScrollLeft = scrollContainerRef.current.scrollLeft;

    const targetOffset = tabOffset - centerX;
    if (targetOffset < 0) {
      scrollContainerRef.current.scrollBy({
        left: targetOffset,
        behavior: "smooth",
      });
    } else {
      scrollContainerRef.current.scrollBy({
        left: targetOffset - currentScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Function to scroll left
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  // Function to scroll right
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  // Function to handle tab click
  const handleTabClick = (index) => {
    scrollToTab(index);
  };

  // Save scroll position on scroll
  const handleScroll = () => {
    localStorage.setItem(
      "scrollPosition",
      scrollContainerRef.current.scrollLeft
    );
  };

  useEffect(() => {
    // Restore scroll position on mount
    const savedPosition = localStorage.getItem("scrollPosition");
    if (savedPosition) {
      scrollContainerRef.current.scrollLeft = parseInt(savedPosition, 10);
    }

    // Add scroll event listener
    const container = scrollContainerRef.current;
    container.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative flex items-center">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 p-2 bg-indigo-600 rounded-full text-white focus:outline-none"
      >
        <FaChevronLeft className="h-3 w-3" />
      </button>

      {/* Navigation Links */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-hidden space-x-2 text-white font-semibold px-8" // Add padding to the sides to avoid overlay with buttons
      >
        {[
          "BCP Form",
          "Document Control",
          "Recovery Strategy",
          "Legal Regulatory & Contractual Requirements",
          "Pre-Incident Preparation",
          "Critical Business Function",
          "Resources Required",
          "Dependencies",
          "Vital Records",
          "Work Area Recovery",
          "Manpower",
          "Recovery and Resumption",
          "Embedded Documents",
        ].map((link, idx) => (
          <NavLink
            key={idx}
            to={`/Business-Continuity-Plan/${link
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            className={({ isActive }) =>
              `whitespace-nowrap px-2 py-1 rounded ${
                isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
              }`
            }
            onClick={() => handleTabClick(idx)}
          >
            {link}
          </NavLink>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 z-10 p-2 bg-indigo-600 rounded-full text-white focus:outline-none"
      >
        <FaChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
};

export default BCPNavigation;
