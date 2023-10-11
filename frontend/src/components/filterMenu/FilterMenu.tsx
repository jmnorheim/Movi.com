import React, { useState, useEffect, useRef, FC } from "react";
import "./FilterMenu.css";
import { CurrentFilter, Movie } from "../../interfaces";
import filtericon from "../../assets/icons/filter-icon.svg";
import x_icon from "../../assets/icons/x_icon.svg";
import checkmark from "../../assets/icons/checkmark.svg";

interface FilterMenuProps {
  movies: Movie[] | [];
  onFilter: (filters: CurrentFilter) => void;
}

const FilterMenu: FC<FilterMenuProps> = ({ movies, onFilter }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  // =======================================================================================================================

  // Find all the unique genres present in the movies array
  const uniqueGenres = Array.from(
    new Set(movies.flatMap((movie: Movie) => movie.genres))
  );

  // =======================================================================================================================

  // Make sure the modal closes when the users clicks outside of it
  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // =======================================================================================================================

  // Update the currently selected filters
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedFilters((prev) => [...prev, event.target.value]);
    } else {
      setSelectedFilters((prev) =>
        prev.filter((filter) => filter !== event.target.value)
      );
    }
  };

  // =======================================================================================================================

  // Send filters to HomePage to handle actual filtering
  useEffect(() => {
    const filter: CurrentFilter = {};

    if (selectedFilters.includes("isAdult")) {
      filter.isAdult = true;
    }

    filter.genres = selectedFilters.filter((filter) => filter !== "isAdult");

    onFilter(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  // =======================================================================================================================

  return (
    <div className="filterMenuContainer">
      <button
        className="filterButton"
        style={{
          backgroundImage: `url(${filtericon})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => setShowModal(!showModal)}
      />

      {showModal && (
        <div className="filterModal" ref={modalRef}>
          <h3 className="modalTitle">Filter by:</h3>
          <button
            style={{
              backgroundImage: `url(${x_icon})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            onClick={() => setShowModal(false)}
            className="closeButton"
          ></button>
          <label>
            <input
              type="checkbox"
              value="isAdult"
              checked={selectedFilters.includes("isAdult")}
              onChange={handleFilterChange}
            />
            isAdult
          </label>
          {uniqueGenres.map((genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                value={genre}
                checked={selectedFilters.includes(genre)}
                onChange={handleFilterChange}
              />
              {genre}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
