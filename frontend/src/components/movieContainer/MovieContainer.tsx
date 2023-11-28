import { MovieContent } from "../../interfaces";
import "./MovieContainer.css";
import empty_poster_pic from "../../assets/images/empty_poster_pic.png";

interface MovieContainerProps {
  movie: MovieContent;
}

const MovieContainer = ({ movie }: MovieContainerProps) => {
  const posterSrc = movie.poster.startsWith("data")
    ? empty_poster_pic
    : movie.poster;
  const posterIsEmpty = movie.poster.startsWith("data");

  return (
    <div className="movie-container">
      <img
        className="rectangle"
        alt={movie.primaryTitle + " poster"}
        src={posterSrc}
      />
      {posterIsEmpty && (
        <div className="no-poster-text">No poster available</div>
      )}
      <div className="div">
        <div className="text-wrapper">{movie.primaryTitle}</div>
      </div>
      <div className="text-wrapper-3">{movie.startYear}</div>
    </div>
  );
};

export default MovieContainer;
