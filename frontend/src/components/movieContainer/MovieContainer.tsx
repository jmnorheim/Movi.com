import { Movie } from "../../interfaces";
import "./MovieContainer.css";
import { HeartIcon } from "../../assets/icons/HeartIcon";
import { ArrowDownIcon } from "../../assets/icons/ArrowDownIcon";
import posterImage from "./rectangle-1.png";

interface MovieContainerProps {
  movie: Movie;
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
