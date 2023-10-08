import MovieContainer from "../../components/movieContainer/MovieContainer";
import { MovieContent } from "../../interfaces";
import "./MovieContainerGrid.css";
import { Link } from "react-router-dom";

interface MovieContainerGridProps {
  movies: MovieContent[];
  onToggleFavorite: (imdbID: string) => void;
}

const MovieContainerGrid = ({
  movies,
  onToggleFavorite,
}: MovieContainerGridProps) => {
  return (
    <div className="MovieContainerGrid">
      {movies.map((movie, index) => (
        <div key={index}>
          <Link to={"/movie/" + movie.imdbID} key={movie.imdbID}>
            <MovieContainer movieContent={movie} />
          </Link>
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
        </div>
      ))}
    </div>
  );
};

export default MovieContainerGrid;
