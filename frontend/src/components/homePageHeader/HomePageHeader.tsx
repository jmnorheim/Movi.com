import { FC, useEffect, useRef, useState } from "react";
import "./HomePageHeader.css";
import headerImage1 from "../../assets/images/home_page1.jpg";
import headerImage2 from "../../assets/images/home_page2.jpg";
import headerImage3 from "../../assets/images/home_page3.jpg";
import headerImage4 from "../../assets/images/home_page4.jpg";
import headerImage5 from "../../assets/images/home_page5.jpg";
import headerImage6 from "../../assets/images/home_page6.jpg";
import headerImage7 from "../../assets/images/home_page7.jpg";
import headerImage8 from "../../assets/images/home_page8.jpg";
import headerImage9 from "../../assets/images/home_page9.jpg";
import headerImage10 from "../../assets/images/home_page10.jpg";
import SearchBar from "../searchBar/SearchBar";
import FilterSideBar from "../filterSideBar/FilterSideBar";

import filtericon from "../../assets/icons/filter-icon.svg";
import { useRandomHomeImage } from "../../services/utilities/hooks";

interface HomePageHeaderProps {
  genres: string[] | [];
}

/**
 * HomePageHeader Component
 *
 * This component renders the header section of the home page. It includes a dynamic background image, a welcoming text, and a search bar.
 * Additionally, it features a button to toggle the visibility of the filter sidebar for movie filtering.
 *
 * Props:
 * @param {string[] | []} genres - An array of movie genres to be used in the filter sidebar.
 *
 * Features:
 * - Dynamically changing background images from a predefined list, switching every 5 seconds.
 * - A welcoming text highlighting the Møvi database and the available number of movies.
 * - A search bar component (`SearchBar`) for searching through movies.
 * - A button to toggle the filter sidebar (`FilterSideBar`) for advanced movie filtering.
 * - The `useRandomHomeImage` hook is used for cycling through the background images.
 * - Implements a click-outside listener to close the filter sidebar when a click is detected outside of it.
 */
const HomePageHeader: FC<HomePageHeaderProps> = ({ genres }) => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const filterSidebarRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const images: string[] = [
    headerImage1,
    headerImage2,
    headerImage3,
    headerImage4,
    headerImage5,
    headerImage6,
    headerImage7,
    headerImage8,
    headerImage9,
    headerImage10,
  ];

  const image = useRandomHomeImage(images, 5000); // Switch background image every 5 seconds

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterSidebarRef.current &&
        !filterSidebarRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="overlap-group">
      <img className="IMG" alt="Header image" src={image} />
      <div className="div">
        <div className="text-wrapper">Welcome to the Møvi database</div>
        <div className="text-wrapper-2">Browse over 260 000 movies!</div>
        <div className="div-2">
          <div className="content-wrapper">
            <div className="search-bar">
              <SearchBar />
            </div>
          </div>
          <button
            ref={filterButtonRef}
            className="filterButton"
            aria-label="Filter button"
            style={{
              backgroundImage: `url(${filtericon})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              outline: "none",
            }}
            onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
          />
          <div ref={filterSidebarRef}>
            <FilterSideBar open={isFilterSidebarOpen} genres={genres} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageHeader;
