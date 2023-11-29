import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "../../../src/assets/icons/ArrowDownIcon";
import { useAuth } from "../../services/auth/AuthContext";
import { useUsersLibrariesQuery } from "../../services/getUserLibraries.ts";
import { addMovieToLibrary } from "../../services/addMovieToLibrary.ts";
import { addMovieToFavorite } from "../../services/addMovieToFavorites.ts";
import { invalidateIsMovieInFavorites } from "../../services/isMovieInFavorite.ts";
import { useQueryClient } from "@tanstack/react-query";
import { Alert } from "@navikt/ds-react";
import "@navikt/ds-css";
import checkmark from "../../assets/icons/checkmark.svg";
import red_cross from "../../assets/icons/red_cross.svg";
import "./AddToLibraryButton.css";
import { Library } from "../../interfaces.ts";

interface AddToLibraryButtonProps {
  imdbID: string;
  width: string;
  height: string;
  fontSize: string;
  dropdownPosition?: { top: string; left: string };
  dropDownItemMaxWidth?: string;
}

/**
 * Component for adding a movie to a library or favorites.
 *
 * This component provides a dropdown button that allows users to add a movie to their favorite list or any of their libraries.
 * It handles the addition of the movie and displays alerts based on the success or failure of these actions.
 *
 * Props:
 * @param {string} imdbID - The IMDB ID of the movie to be added.
 * @param {string} width - The width of the button.
 * @param {string} height - The height of the button.
 * @param {string} fontSize - The font size of the button text.
 * @param {{ top: string; left: string }} [dropdownPosition] - The position of the dropdown menu.
 * @param {string} [dropDownItemMaxWidth='100%'] - The maximum width of the dropdown items.
 *
 * Features:
 * - Dropdown menu to select between adding to favorites or a specific library.
 * - Visual feedback (checkmark or cross) indicating the success or failure of adding the movie.
 * - Alert messages for providing more detailed feedback to the user.
 * - Uses custom hooks from the services for querying and mutating data.
 */
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

  const createCompoundKey = (libraryID: string, movieID: string) => {
    return `${libraryID}-${movieID}`;
  };

  const handleAddMovieLibrary = async (library: Library, imdbID: string) => {
    try {
      await addMovieToLibrary(library.libraryID, imdbID);
      const key = createCompoundKey(library.libraryID, imdbID);
      setAddStatus(new Map(addStatus.set(key, "success")));
      showAlertWithTimer("Movie added to library", library.name);
    } catch (error) {
      showAlertWithTimer(
        "Movie has already been added to library",
        library.name
      );
      const key = createCompoundKey(library.libraryID, imdbID);
      setAddStatus(new Map(addStatus.set(key, "error")));
    }
  };

  const handleAddMovieFavorites = async (userID: string, imdbID: string) => {
    try {
      await addMovieToFavorite(userID, imdbID);
      const key = createCompoundKey("favorites", imdbID);
      setAddStatus(new Map(addStatus.set(key, "success")));
      showAlertWithTimer("Movie added to favorites");
      await invalidateIsMovieInFavorites(userID, imdbID, queryClient);
    } catch (error) {
      showAlertWithTimer("Movie has already been added to Favorites");
      const key = createCompoundKey("favorites", imdbID);
      setAddStatus(new Map(addStatus.set(key, "error")));
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
    // Clear existing timer and alert
    if (alertTimer) {
      clearTimeout(alertTimer);
      setShowAlert(false);
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
          {(() => {
            const favoritesKey = createCompoundKey("favorites", imdbID);
            const status = addStatus.get(favoritesKey);

            return (
              <div
                className="dropdown-item"
                onClick={() => {
                  void handleAddMovieFavorites(userID, imdbID);
                }}
              >
                <div className="favorites-text">Favorites</div>
                {status && (
                  <img
                    src={status === "success" ? checkmark : red_cross}
                    alt="Icon for shoving success or failure for adding to library"
                    className="dropdown-item-icon"
                  />
                )}
              </div>
            );
          })()}
          {libraries?.map((library) => {
            const key = createCompoundKey(library.libraryID, imdbID);
            return (
              <div
                key={library.libraryID}
                className="dropdown-item"
                onClick={() => {
                  void handleAddMovieLibrary(library, imdbID);
                }}
                style={{ width: dropDownItemMaxWidth }}
              >
                <div className="library-name">{library.name}</div>
                {addStatus.get(key) && (
                  <img
                    src={
                      addStatus.get(key) === "success" ? checkmark : red_cross
                    }
                    alt="icon"
                    className="dropdown-item-icon"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
      {showAlert && (
        <Alert
          variant={
            alertMessage.startsWith("Movie has already been added")
              ? "error"
              : "success"
          }
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
