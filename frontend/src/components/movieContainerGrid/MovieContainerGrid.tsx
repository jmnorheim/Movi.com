import { useAuth } from "../../AuthContext";
import MovieContainer from "../../components/movieContainer/MovieContainer";
import { Movie } from "../../interfaces";
import "./MovieContainerGrid.css";
import { Link } from "react-router-dom";
import three_dots from "../../assets/icons/three_dots.svg";
import { useState } from "react";

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

  const handleLibraryToggle = (libraryName: string, movieId: string) => {
    updateLibrary(libraryName, movieId);
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
              <div
                className={`star ${
                  movie.favorited ? "star-filled" : "star-outline"
                }`}
                onClick={() => {
                  onToggleFavorite(movie.imdbID);
                }}
              >
                ★
              </div>
              <div
                className="three-dots-container"
                onClick={() => setOpenDropdown(movie.imdbID)}
              >
                <img src={three_dots} alt="Menu" />
                {openDropdown === movie.imdbID && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">Add to playlist:</div>
                    {getLibraries().map((library) => (
                      <div className="dropdown-item" key={library.name}>
                        {library.name}
                        <button
                          onClick={() =>
                            handleLibraryToggle(library.name, movie.imdbID)
                          }
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieContainerGrid;
