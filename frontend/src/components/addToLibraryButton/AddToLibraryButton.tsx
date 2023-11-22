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
import plus from "../../assets/icons/plus.svg";
import checkmark from "../../assets/icons/checkmark.svg";
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
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [addedLibraries, setAddedLibraries] = useState<Set<string>>(new Set());
  const { userID } = useAuth();
  const { data: libraries } = useUsersLibrariesQuery(userID);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const addMovieLibrary = async (library: Library, imdbID: string) => {
    try {
      await addMovieToLibrary(library.libraryID, imdbID);
      setAddedLibraries(new Set(addedLibraries.add(library.libraryID)));
    } catch (error) {
      setAlertMessage(
        `You have already added this movie to library ${library.name}`
      );
      setShowAlert(true);
    }
  };

  const addMovieFavorites = async (userID: string, imdbID: string) => {
    try {
      await addMovieToFavorite(userID, imdbID);
      setAddedToFavorites(true);
      await invalidateIsMovieInFavorites(userID, imdbID, queryClient);
    } catch (error) {
      setAlertMessage("You have already added this movie to Favorites");
      setShowAlert(true);
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

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // hides the alert after 3 seconds
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showAlert, alertMessage]); // Reset the timer if showAlert or alertMessage changes

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
              void addMovieFavorites(userID, imdbID);
            }}
          >
            <div className="favorites-text">Favorites</div>
            <img
              src={addedToFavorites ? checkmark : plus}
              alt="icon"
              className="dropdown-item-icon"
            />
          </div>
          {libraries?.map((library) => (
            <div
              key={library.libraryID}
              className="dropdown-item"
              onClick={() => {
                void addMovieLibrary(library, imdbID);
              }}
              style={{ width: dropDownItemMaxWidth }}
            >
              <div className="library-name">{library.name}</div>
              <img
                src={addedLibraries.has(library.libraryID) ? checkmark : plus}
                alt="icon"
                className="dropdown-item-icon"
              />
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
