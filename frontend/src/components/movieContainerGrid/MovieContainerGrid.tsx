import { useAuth } from "../../services/auth/AuthContext";
import MovieContainer from "../../components/movieContainer/MovieContainer";
import { Movie } from "../../interfaces";
import "./MovieContainerGrid.css";
import { Link } from "react-router-dom";
import { useState } from "react";

// Icons
import x_icon from "../../assets/icons/x_icon.svg";
import three_dots from "../../assets/icons/three_dots.svg";
import plus from "../../assets/icons/plus.svg";
import checkmark from "../../assets/icons/checkmark.svg";

interface MovieContainerGridProps {
  movies: Movie[];
  onToggleFavorite: (imdbID: string) => void;
}

const MovieContainerGrid = ({
  movies,
  onToggleFavorite,
}: MovieContainerGridProps) => {
  const { isLoggedIn, email, getLibraries, updateLibrary } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [addedToLibraries, setAddedToLibraries] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const handleLibraryToggle = (libraryName: string, movieID: string) => {
    if (!libraryName || !movieID) return;
    updateLibrary(libraryName, movieID);

    setAddedToLibraries((prev) => ({
      ...prev,
      [movieID]: {
        ...prev[movieID],
        [libraryName]: !(prev[movieID] && prev[movieID][libraryName]),
      },
    }));
  };

  return (
    <div className="MovieContainerGrid">
      {movies.map((movie, index) => (
        <div key={index}>
          <Link to={"/movie/" + movie.imdbID} key={movie.imdbID}>
            <MovieContainer movie={movie} />
          </Link>
          {isLoggedIn && (
            <div className="icon-container">
              {/* <div
                className={`star ${
                  movie.favorited ? "star-filled" : "star-outline"
                }`}
                onClick={() => {
                  onToggleFavorite(movie.imdbID);
                }}
              >
                ★
              </div> */}
              {/* <div
                className="three-dots-container"
                onClick={() => setOpenDropdown(movie.imdbID)}
              >
                <img src={three_dots} alt="Menu" className="three-dots" />
                {openDropdown === movie.imdbID && (
                  <div className="dropdown-menu">
                    <span
                      className="close-dropdown"
                      onClick={(e) => {
                        e.stopPropagation(); // Stop event propagation
                        setOpenDropdown(null);
                      }}
                    >
                      <img src={x_icon} alt="Close" className="close-icon" />
                    </span>
                    <div className="dropdown-header">Add to playlist:</div>
                    {getLibraries().map((library) => (
                      <div className="dropdown-item" key={library.name}>
                        {library.name}
                        <button
                          className="add-to-library-button"
                          onClick={() =>
                            handleLibraryToggle(library.name, movie.imdbID)
                          }
                        >
                          {addedToLibraries[movie.imdbID] &&
                          addedToLibraries[movie.imdbID][library.name] ? (
                            <img
                              src={checkmark}
                              alt="Added"
                              className="checkmark"
                            />
                          ) : (
                            <img src={plus} alt="Add" className="plus" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div> */}
              {/* )} */}
              {/* </div> */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieContainerGrid;
