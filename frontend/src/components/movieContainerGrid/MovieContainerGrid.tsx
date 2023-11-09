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
import { HeartIcon } from "../../assets/icons/HeartIcon";
import { ArrowDownIcon } from "../../assets/icons/ArrowDownIcon";

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
        <div key={index} style={{ position: "relative" }}>
          <button
            className="heart-container"
            onClick={() => onToggleFavorite(movie.imdbID)}
          >
            <HeartIcon
              className={`vuesax-linear-heart ${
                movie.favorited ? "filled" : ""
              }`}
            />
          </button>
          <Link to={"/movie/" + movie.imdbID} key={movie.imdbID}>
            <MovieContainer movie={movie} />
          </Link>
          <button className="button">
            <div className="text-wrapper-2">Add To Library</div>
            <ArrowDownIcon className="icon-instance" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieContainerGrid;
