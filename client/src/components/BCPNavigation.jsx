// import { NavLink } from "react-router-dom";

// const BCPNavigation = () => {
//   return (
//     <div className="flex overflow-x-auto scrollbar-thin space-x-2 text-white font-semibold">
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         BCP Form
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Document Control
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Recovery Strategy
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Legal Requirements
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Pre-Incident Preparation
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Critical Business Function
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Resources Required
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Dependencies
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Vital Records
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Work Area Recovery
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Manpower
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Recovery and Resumption
//       </NavLink>
//       <NavLink
//         to="/Business-Continuity-Plan/"
//         className={({ isActive }) =>
//           `whitespace-nowrap px-2 py-1 rounded-lg ${
//             isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
//           }`
//         }
//       >
//         Embedded Documents
//       </NavLink>
//     </div>
//   );
// };

// export default BCPNavigation;

import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Using HeroIcons for arrow icons

const BCPNavigation = () => {
  const scrollContainerRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  // Function to scroll right
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

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
          "Legal Requirements",
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
              `whitespace-nowrap px-2 py-1 rounded-lg ${
                isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
              }`
            }
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
