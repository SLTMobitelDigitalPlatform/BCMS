import { useEffect, useMemo, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink, useLocation, useParams } from "react-router-dom";

const BIANavigation = () => {
  const carouselRef = useRef(null);
  const location = useLocation();

  const { biaid } = useParams();

  const links = useMemo(
    () => [
          "BIA Form",
          "Document Version",
          "Operating Sites",
          "Critical Business Function",
          "Business Peaks and Deadlines",
          "Resources",
          "Impact Analysis",
          "Resources Required",
          "Dependencies",
          "Work Area Recovery",
          "Manpower",
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
        const pathSegments = location.pathname.split("/");
        const currentTab = pathSegments[pathSegments.length - 2];
    
        const tabIndex = links.findIndex(
          (link) => link.replace(/\s+/g, "-").toLowerCase() === currentTab
        );
    
        if (tabIndex !== -1 && carouselRef.current) {
          const numItems = links.length;
          const centerOffset = Math.floor(responsive.desktop.items / 2);
          const additionalOffset = -2.5;
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
                to={`/Business-Impact-Analysis/${link
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/${biaid}`}
                className={({ isActive }) =>
                  `block px-2 py-1 rounded font-semibold ${
                    isActive ? "doc-nav-active" : "doc-nav-hover"
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

export default BIANavigation;
