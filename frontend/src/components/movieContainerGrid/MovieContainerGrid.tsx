import { useAuth } from "../../services/auth/AuthContext";
import MovieContainer from "../../components/movieContainer/MovieContainer";
import { MovieContent } from "../../interfaces";
import "./MovieContainerGrid.css";
import { Link } from "react-router-dom";
import { page } from "../../pages/HomePage/HomePage";

// Icons
import AddToLibraryButton from "../addToLibraryButton/AddToLibraryButton";

interface MovieContainerGridProps {
  movies: MovieContent[];
}

/**
 * MovieContainerGrid Component
 *
 * This component arranges and displays a grid of movies using `MovieContainer` components.
 * Each movie in the grid is wrapped in a link to its detailed page and, if the user is logged in,
 * includes an `AddToLibraryButton` for adding the movie to a user's library or favorites.
 *
 * Props:
 * @param {MovieContent[]} movies - An array of movie objects to be displayed in the grid.
 *
 * Features:
 * - Renders a grid layout of movies where each movie is presented in a `MovieContainer`.
 * - Provides a link for each movie that navigates to the movie's detailed page.
 * - Incorporates `AddToLibraryButton` for each movie to enable adding the movie to libraries or favorites, visible only to logged-in users.
 * - Utilizes `useAuth` from `../../services/auth/AuthContext` to check the user's authentication status.
 * - Stores the current page number in session storage for persistence across navigation.
 */
const MovieContainerGrid = ({ movies }: MovieContainerGridProps) => {
  const { isLoggedIn } = useAuth();

  const storePageValue = () => {
    sessionStorage.setItem("pageNumber", page.value.toString());
  };

  return (
    <div className="MovieContainerGrid">
      {movies.map((movie, index) => (
        <div
          key={index}
          style={{ position: "relative", textDecoration: "none" }}
        >
          <Link
            to={"/movie/" + movie.imdbID}
            key={movie.imdbID}
            style={{ textDecoration: "none" }}
            onClick={storePageValue}
          >
            <MovieContainer movie={movie} />
          </Link>
          {isLoggedIn && (
            <AddToLibraryButton
              imdbID={movie.imdbID}
              width="120px"
              height="25px"
              fontSize="12px"
              dropdownPosition={{ top: "98%", left: "55%" }}
              dropDownItemMaxWidth="140px"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieContainerGrid;
