import React, { useState } from "react";
import { ArrowDownIcon } from "../../../src/assets/icons/ArrowDownIcon";
import { useAuth } from "../../services/auth/AuthContext";
import { useUsersLibrariesQuery } from "../../services/getUserLibraries.ts";
import { addMovieToLibrary } from "../../services/addMovieToLibrary.ts";
import { addMovieToFavorite } from "../../services/addMovieToFavorites.ts";

interface AddToLibraryButtonProps {
  imdbID: string;
}

const AddToLibraryButton = ({ imdbID }: AddToLibraryButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userID } = useAuth();
  const { data: libraries } = useUsersLibrariesQuery(userID);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const addMovieLibrary = async (libID: string, imdbID: string) => {
    await addMovieToLibrary(imdbID, libID);
  };

  const addMovieFavorites = async (userId: string, imdbID: string) => {
    await addMovieToFavorite(userId, imdbID);
  };

  return (
    <div>
      <button
        className="button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        <div className="text-wrapper-2">Add To Library</div>
        <ArrowDownIcon
          className={isDropdownOpen ? "icon-instance-open" : "icon-instance"}
        />
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu-library">
          <div
            className="dropdown-item"
            onClick={() => void addMovieFavorites(userID, imdbID)}
          >
            Favorites
          </div>
          {libraries?.map((library) => (
            <div
              key={library.libraryID}
              className="dropdown-item"
              onClick={() => void addMovieLibrary(library.libraryID, imdbID)}
            >
              {library.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddToLibraryButton;
