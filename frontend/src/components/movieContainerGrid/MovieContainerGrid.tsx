import { useAuth } from "../../AuthContext";
import MovieContainer from "../../components/movieContainer/MovieContainer";
import { Movie } from "../../interfaces";
import "./MovieContainerGrid.css";
import { Link } from "react-router-dom";

interface MovieContainerGridProps {
  movies: Movie[];
  onToggleFavorite: (imdbID: string) => void;
}

const MovieContainerGrid = ({
  movies,
  onToggleFavorite,
}: MovieContainerGridProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="MovieContainerGrid">
      {movies.map((movie, index) => (
        <div key={index}>
          <Link to={"/movie/" + movie.imdbID} key={movie.imdbID}>
            <MovieContainer movie={movie} />
          </Link>
          {isLoggedIn && (
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
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieContainerGrid;
