import { useEffect, useMemo, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink, useLocation } from "react-router-dom";

const BCPNavigation = () => {
  const carouselRef = useRef(null);
  const location = useLocation();

  const links = useMemo(
    () => [
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
    ],
    []
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    const tabIndex = links.findIndex(
      (link) => link.replace(/\s+/g, "-").toLowerCase() === currentPath
    );

    if (tabIndex !== -1 && carouselRef.current) {
      const numItems = links.length;
      const centerOffset = Math.floor(responsive.desktop.items / 2);
      const additionalOffset = -1.5;
      const centeredIndex = Math.max(
        Math.min(
          tabIndex - centerOffset + additionalOffset,
          numItems - responsive.desktop.items
        ),
        0
      );

      carouselRef.current.goToSlide(centeredIndex);
    }
  }, [location.pathname, links, responsive.desktop.items]);

  return (
    <div className="relative flex items-center">
      {/* Left Arrow */}
      <button
        className="absolute left-0 z-10 p-2 bg-indigo-600 hover:bg-indigo-800 rounded-full text-white focus:outline-none"
        onClick={() => carouselRef.current.previous()}
      >
        <FaChevronLeft className="h-3.5 w-3.5" />
      </button>

      {/* Carousel */}
      <Carousel
        responsive={responsive}
        ref={carouselRef}
        customLeftArrow={null}
        customRightArrow={null}
        showDots={false}
        autoPlay={false}
        arrows={false}
        keyBoardControl={true}
        containerClass="w-full mx-8"
        itemClass="mx-2 max-w-fit "
      >
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={`/Business-Continuity-Plan/${link
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            className={({ isActive }) =>
              `block px-2 py-1 rounded text-white font-semibold text-center ${
                isActive ? "bg-green-500" : "bg-indigo-900 hover:bg-indigo-600"
              }`
            }
            onClick={() => {
              localStorage.setItem("carouselIndex", idx);
            }}
          >
            {link}
          </NavLink>
        ))}
      </Carousel>

      {/* Right Arrow */}
      <button
        className="absolute right-0 z-10 p-2 bg-indigo-600 hover:bg-indigo-800 rounded-full text-white focus:outline-none"
        onClick={() => carouselRef.current.next()}
      >
        <FaChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default BCPNavigation;

// const scrollContainerRef = useRef(null);

// // Function to scroll to a specific tab
// const scrollToTab = (tabIndex) => {
//   const tabWidth = 150; // adjust this value to match your tab width
//   const containerWidth = scrollContainerRef.current.offsetWidth;
//   const tabOffset = tabIndex * tabWidth;
//   const centerX = containerWidth / 2;
//   const currentScrollLeft = scrollContainerRef.current.scrollLeft;

//   const targetOffset = tabOffset - centerX;
//   if (targetOffset < 0) {
//     scrollContainerRef.current.scrollBy({
//       left: targetOffset,
//       behavior: "smooth",
//     });
//   } else {
//     scrollContainerRef.current.scrollBy({
//       left: targetOffset - currentScrollLeft,
//       behavior: "smooth",
//     });
//   }
// };

// // Function to handle tab click
// const handleTabClick = (index) => {
//   scrollToTab(index);
// };

// // Function to scroll left
// // const scrollLeft = () => {
// //   scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
// // };

// // // Function to scroll right
// // const scrollRight = () => {
// //   scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
// // };

// // Save scroll position on scroll
// const handleScroll = () => {
//   localStorage.setItem(
//     "scrollPosition",
//     scrollContainerRef.current.scrollLeft
//   );
// };

// useEffect(() => {
//   // Restore scroll position on mount
//   const savedPosition = localStorage.getItem("scrollPosition");
//   if (savedPosition) {
//     scrollContainerRef.current.scrollLeft = parseInt(savedPosition, 10);
//   }

//   // Add scroll event listener
//   const container = scrollContainerRef.current;
//   container.addEventListener("scroll", handleScroll);

//   // Cleanup event listener on unmount
//   return () => {
//     container.removeEventListener("scroll", handleScroll);
//   };
// }, []);

{
  /* <div className="relative flex items-center">
      
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 p-2 bg-indigo-600 rounded-full text-white focus:outline-none"
      >
        <FaChevronLeft className="h-3 w-3" />
      </button>

      
      <div
        ref={scrollContainerRef}
        className="flex overflow-hidden space-x-2 text-white font-semibold px-8" // Add padding to the sides to avoid overlay with buttons
      >
        {.map((link, idx) => (
          <Link
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
          </Link>
        ))}
      </div>

      
      <button
        onClick={scrollRight}
        className="absolute right-0 z-10 p-2 bg-indigo-600 rounded-full text-white focus:outline-none"
      >
        <FaChevronRight className="h-3 w-3" />
      </button>
    </div> */
}
