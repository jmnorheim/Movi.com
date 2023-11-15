import React, { FC, useState } from "react";
import "./HomePageHeader.css";
import { CurrentFilter, Movie, MovieContent } from "../../interfaces";
import headerImage from "../../assets/images/headerImage.png";
import SearchBar from "../searchBar/SearchBar";
import FilterSideBar from "../filterSideBar/FilterSideBar";

import filtericon from "../../assets/icons/filter-icon.svg";

interface HomePageHeaderProps {
  movies: MovieContent[] | [];
  onFilter: (filters: CurrentFilter) => void;
}

const HomePageHeader: FC<HomePageHeaderProps> = ({ movies, onFilter }) => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  return (
    <div className="overlap-group">
      <div className="ellipse" />
      <img className="IMG" alt="Img" src={headerImage} />
      <div className="div">
        <div className="text-wrapper">Welcome to the Møvie database</div>
        <div className="text-wrapper-2">Browse over 290 000 movies!</div>
        <div className="div-2">
          <div className="content-wrapper">
            <div className="search-bar">
              <SearchBar />
            </div>
          </div>
          <button
            className="filterButton"
            style={{
              backgroundImage: `url(${filtericon})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
          />
          <FilterSideBar open={isFilterSidebarOpen} movies={movies} />
          {/* {movies?.length && <FilterMenu movies={movies} onFilter={onFilter} />} */}
        </div>
      </div>
    </div>
  );
};

export default HomePageHeader;
