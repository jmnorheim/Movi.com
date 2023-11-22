import React, { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "../../../src/assets/icons/ArrowDownIcon";
import { useAuth } from "../../services/auth/AuthContext";
import { useUsersLibrariesQuery } from "../../services/getUserLibraries.ts";
import { addMovieToLibrary } from "../../services/addMovieToLibrary.ts";
import { addMovieToFavorite } from "../../services/addMovieToFavorites.ts";
import { invalidateIsMovieInFavorites } from "../../services/isMovieInFavorite.ts";
import { useQueryClient } from "@tanstack/react-query";
import { Alert } from "@navikt/ds-react";
import "@navikt/ds-css";
import plus from "../../assets/icons/plus.svg";
import checkmark from "../../assets/icons/checkmark.svg";
import red_cross from "../../assets/icons/red_cross.svg";
import "./AddToLibraryButton.css";
import { Library } from "../../interfaces.ts";

interface AddToLibraryButtonProps {
  imdbID: string;
  width: string; // e.g. '200px', '100%'
  height: string; // e.g. '40px'
  fontSize: string; // e.g. '16px'
  dropdownPosition?: { top: string; left: string }; // e.g. { top: '100%', left: '0' }
  dropDownItemMaxWidth?: string; // e.g. '100%'
}

const AddToLibraryButton = ({
  imdbID,
  width,
  height,
  fontSize,
  dropdownPosition,
  dropDownItemMaxWidth = "100%",
}: AddToLibraryButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTimer, setAlertTimer] = useState<NodeJS.Timeout | null>(null);
  const [addStatus, setAddStatus] = useState<Map<string, string>>(new Map()); // Checkmark or Cross
  const { userID } = useAuth();
  const { data: libraries } = useUsersLibrariesQuery(userID);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddMovieLibrary = async (library: Library, imdbID: string) => {
    try {
      await addMovieToLibrary(library.libraryID, imdbID);
      setAddStatus(new Map(addStatus.set(library.libraryID, "success")));
    } catch (error) {
      showAlertWithTimer(
        "Movie has already been added to library",
        library.name
      );
      setAddStatus(new Map(addStatus.set(library.libraryID, "error")));
    }
  };

  const handleAddMovieFavorites = async (userID: string, imdbID: string) => {
    try {
      await addMovieToFavorite(userID, imdbID);
      setAddStatus(new Map(addStatus.set("favorites", "success")));
      await invalidateIsMovieInFavorites(userID, imdbID, queryClient);
    } catch (error) {
      showAlertWithTimer("Movie has already been added to favorites");
      setAddStatus(new Map(addStatus.set("favorites", "error")));
    }
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

  const showAlertWithTimer = (message: string, libraryName?: string) => {
    // Clear existing timer
    if (alertTimer) {
      clearTimeout(alertTimer);
    }

    if (libraryName) {
      message += ` ${libraryName}`;
    }
    setAlertMessage(message);
    setShowAlert(true);

    // Set new timer and store it in AlertTimer-state
    const newTimer = setTimeout(() => {
      setShowAlert(false);
    }, 3000); // hides the alert after 3 seconds
    setAlertTimer(newTimer);
  };

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
            isDropdownOpen ? "icon-instance arrow-rotated" : "icon-instance"
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
              void handleAddMovieFavorites(userID, imdbID);
            }}
          >
            <div className="favorites-text">Favorites</div>
            {addStatus.get("favorites") && (
              <img
                src={
                  addStatus.get("favorites") === "success"
                    ? checkmark
                    : red_cross
                }
                alt="icon"
                className="dropdown-item-icon"
              />
            )}
          </div>
          {libraries?.map((library) => (
            <div
              key={library.libraryID}
              className="dropdown-item"
              onClick={() => {
                void handleAddMovieLibrary(library, imdbID);
              }}
              style={{ width: dropDownItemMaxWidth }}
            >
              <div className="library-name">{library.name}</div>
              {addStatus.get(library.libraryID) && (
                <img
                  src={
                    addStatus.get(library.libraryID) === "success"
                      ? checkmark
                      : red_cross
                  }
                  alt="icon"
                  className="dropdown-item-icon"
                />
              )}
            </div>
          ))}
        </div>
      )}
      {showAlert && (
        <Alert
          variant="error"
          style={{
            position: "fixed",
            bottom: "10px",
            maxWidth: "90vw",
            left: "10px",
            zIndex: 10000,
            transform: showAlert ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};

export default AddToLibraryButton;
