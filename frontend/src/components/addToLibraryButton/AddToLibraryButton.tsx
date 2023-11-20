import React, { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "../../../src/assets/icons/ArrowDownIcon";
import { useAuth } from "../../services/auth/AuthContext";
import { useUsersLibrariesQuery } from "../../services/getUserLibraries.ts";
import { addMovieToLibrary } from "../../services/addMovieToLibrary.ts";
import { addMovieToFavorite } from "../../services/addMovieToFavorites.ts";
import { invalidateIsMovieInFavorites } from "../../services/isMovieInFavorite.ts";
import { useQueryClient } from "@tanstack/react-query";
import "./AddToLibraryButton.css";

interface AddToLibraryButtonProps {
  imdbID: string;
  width: string; // e.g. '200px', '100%'
  height: string; // e.g. '40px'
  fontSize: string; // e.g. '16px'
  dropdownPosition?: { top: string; left: string }; // e.g. { top: '100%', left: '0' }
}

const AddToLibraryButton = ({
  imdbID,
  width,
  height,
  fontSize,
  dropdownPosition,
}: AddToLibraryButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userID } = useAuth();
  const { data: libraries } = useUsersLibrariesQuery(userID);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const addMovieLibrary = async (libID: string, imdbID: string) => {
    await addMovieToLibrary(libID, imdbID);
    toggleDropdown();
  };

  const addMovieFavorites = async (userId: string, imdbID: string) => {
    await addMovieToFavorite(userId, imdbID);
    toggleDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} style={{ width, height }}>
      <button
        className="button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        style={{ width, height, fontSize }}
      >
        <div className="add-to-library-text" style={{ fontSize }}>
          Add To Library
        </div>
        <ArrowDownIcon
          className={
            isDropdownOpen
              ? "icon-instance-open arrow-rotated"
              : "icon-instance"
          }
        />
      </button>
      {isDropdownOpen && (
        <div
          className="dropdown-menu-library"
          style={{ ...dropdownPosition, width }}
        >
          <div
            className="dropdown-item"
            onClick={() => {
              void addMovieFavorites(userID, imdbID); // This call is now 'fire-and-forget'
              void invalidateIsMovieInFavorites(userID, imdbID, queryClient);
            }}
          >
            Favorites
          </div>
          {libraries?.map((library) => (
            <div
              key={library.libraryID}
              className="dropdown-item"
              onClick={() => {
                void addMovieLibrary(library.libraryID, imdbID);
              }}
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
