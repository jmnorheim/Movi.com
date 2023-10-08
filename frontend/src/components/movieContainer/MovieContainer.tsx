import { Movie } from "../../interfaces";
import "./MovieContainer.css";

interface MovieContainerProps {
  movie: Movie;
}

const MovieContainer = ({ movie }: MovieContainerProps) => {
  return (
    <div className="MovieContainer">
      <img src={movie.poster} alt="poster" className="ImageContainer" />
      <h3>{movie.primaryTitle}</h3>
      <h4>Rating: {movie.averageRating}</h4>
    </div>
  );
};

export default MovieContainer;
