import React, { FC, useEffect, useRef, useState } from "react";
import "./HomePageHeader.css";
import { CurrentFilter, Movie, MovieContent } from "../../interfaces";
import headerImage from "../../assets/images/headerImage.png";
import SearchBar from "../searchBar/SearchBar";
import FilterSideBar from "../filterSideBar/FilterSideBar";

import filtericon from "../../assets/icons/filter-icon.svg";

interface HomePageHeaderProps {
  genres: string[] | [];
  onFilter: (filters: CurrentFilter) => void;
}

const HomePageHeader: FC<HomePageHeaderProps> = ({ genres, onFilter }) => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const filterSidebarRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

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
      <div className="ellipse" />
      <img className="IMG" alt="Img" src={headerImage} />
      <div className="div">
        <div className="text-wrapper">Welcome to the Møvie database</div>
        <div className="text-wrapper-2">Browse over 290 000 movies!</div>
        <div className="div-2">
          <div className="content-wrapper">
            <div className="content">
              <SearchBar />
            </div>
          </div>
          <button
            ref={filterButtonRef}
            className="filterButton"
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
