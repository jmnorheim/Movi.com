import React, { FC, useState } from "react";
import "./SortMenu.css";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import { SortType } from "../../generated/graphql";

const sortTypeDisplayMapping: { [key in SortType]: string } = {
  DurationHILO: "Duration: High to Low",
  DurationLOHI: "Duration: Low to High",
  RatingHILO: "Rating: High to Low",
  RatingLOHI: "Rating: Low to High",
  TitleAZ: "Title: A to Z",
  TitleZA: "Title: Z to A",
  YearHILO: "Year: New to Old",
  YearLOHI: "Year: Old to New",
};
interface SortMenuProps {
  onSort: (sortType: SortType | null) => void;
}

const SortMenu: FC<SortMenuProps> = ({ onSort }) => {
  const [selectedSort, setSelectedSort] = useState<SortType | null>(
    (sessionStorage.getItem("sort") as SortType) || null
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (sortType: SortType) => {
    onSort(sortType);
    setSelectedSort(sortType);
    sessionStorage.setItem("sort", sortType);
    setIsOpen(false);
  };

  const resetSort = () => {
    onSort(null);
    setSelectedSort(null);
    sessionStorage.removeItem("sort");
    setIsOpen(false);
  };

  return (
    <div className="dropdown-wrapper">
      <button className="button" onClick={() => setIsOpen(!isOpen)}>
        <div className="text-wrapper">
          {selectedSort ? sortTypeDisplayMapping[selectedSort] : "Sort By"}
        </div>
        <ArrowIcon
          className={`vuesax-linear-arrow ${isOpen ? "rotated" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="dropdown-menu-sorting">
          <button
            className="dropdown-item-sorting reset-text"
            onClick={resetSort}
          >
            Reset sorting
          </button>
          {Object.values(SortType).map((sortType) => (
            <button
              key={sortType}
              className="dropdown-item-sorting"
              onClick={() => handleSort(sortType)}
            >
              {sortTypeDisplayMapping[sortType]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortMenu;
