import { Movie, MovieContent } from "../../interfaces";
import "./MovieContainer.css";
import posterImage from "./rectangle-1.png";

interface MovieContainerProps {
  movie: MovieContent;
}

const MovieContainer = ({ movie }: MovieContainerProps) => {
  return (
    <div className="movie-container">
      <img className="rectangle" alt="Rectangle" src={movie.poster} />
      <div className="div">
        <div className="text-wrapper">{movie.primaryTitle}</div>
      </div>
      <div className="text-wrapper-3">{movie.startYear}</div>
    </div>
  );
};

export default MovieContainer;
