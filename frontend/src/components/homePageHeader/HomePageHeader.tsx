import React, { FC } from "react";
import "./HomePageHeader.css";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import FilterMenu from "../filterMenu/FilterMenu";
import { CurrentFilter, Movie } from "../../interfaces";
import headerImage from "../../assets/images/headerImage.png";
import headerImage_enhanced from "../../assets/images/headerImage_enhanced.png";
import SearchBar from "../searchBar/SearchBar";

interface HomePageHeaderProps {
  movies: Movie[] | [];
  onFilter: (filters: CurrentFilter) => void;
  onSearch: (value: string) => void;
}

const HomePageHeader: FC<HomePageHeaderProps> = ({
  movies,
  onFilter,
  onSearch,
}) => {
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
              <SearchBar onSearch={onSearch} />
            </div>
          </div>
          {movies?.length && <FilterMenu movies={movies} onFilter={onFilter} />}
        </div>
      </div>
    </div>
  );
};

export default HomePageHeader;
