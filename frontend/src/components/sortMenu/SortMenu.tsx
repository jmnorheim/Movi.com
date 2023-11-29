import { useState } from "react";
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
  YearHILO: "Release Year: New to Old",
  YearLOHI: "Release Year: Old to New",
};
interface SortMenuProps {
  onSort: (sortType: SortType | null) => void;
}

/**
 * SortMenu Component
 *
 * This component provides a dropdown menu for sorting movies based on different criteria such as duration, rating, title, and release year.
 * It allows users to select a sorting order, which is then applied to the movie list.
 *
 * Props:
 * @param {(sortType: SortType | null) => void} onSort - A callback function that is called when a sort option is selected.
 * It receives the selected `SortType` as a parameter.
 *
 * Features:
 * - Dropdown menu to select the sorting order of movies.
 * - Supports various sorting types defined in `SortType` (e.g., duration high to low, rating low to high etc.).
 * - Selected sort type is displayed on the button, and it defaults to "Sort By" if no sort is selected.
 * - The selected sorting type is stored in session storage for persistence.
 * - Includes a reset option to clear the sorting selection.
 * - Uses the `ArrowIcon` component to indicate the dropdown status and provides a visual cue for interaction.
 */
const SortMenu = ({ onSort }: SortMenuProps) => {
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
