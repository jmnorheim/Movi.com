import React from "react";
import plus from "../../assets/icons/plus.svg";

const LibraryDropdown = ({ movieID, onAddToLibrary }) => {
  const libraries = ["Library 1", "Library 2", "Library 3"]; // Sample libraries

  return (
    <div className="dropdown-menu-library">
      {libraries.map((library) => (
        <div key={library} className="dropdown-item">
          {library}
          <button onClick={() => onAddToLibrary(library, movieID)}>
            <img src={plus} alt="Add" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default LibraryDropdown;
