import React, { useState, FC } from "react";
import "./SortMenu.css";

export enum SortType {
  TitleAZ = "Title A-Z",
  TitleZA = "Title Z-A",
  RatingHILO = "Rating HI-LO",
  RatingLOHI = "Rating LO-HI",
  DurationHILO = "Duration HI-LO",
  DurationLOHI = "Duration LO-HI",
  YearHILO = "Release year HI-LO",
  YearLOHI = "Release year LO-HI",
}

interface SortMenuProps {
  onSort: (sortType: SortType) => void;
}

const SortMenu: FC<SortMenuProps> = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (sortType: SortType) => {
    onSort(sortType);
    setIsOpen(false);
  };

  return (
    <div className="sortMenuContainer">
      <button className="sortButton" onClick={() => setIsOpen(!isOpen)}>
        Sort by
        <span className={`arrow ${isOpen ? "down" : ""}`}></span>
      </button>
      <div className={`menuItems ${isOpen ? "open" : ""}`}>
        {Object.values(SortType).map((sortType) => (
          <button
            key={sortType}
            className="menuItem"
            onClick={() => handleSort(sortType)}
          >
            {sortType}
          </button>
        ))}
      </div>
    </div>
  );
};
export default SortMenu;
