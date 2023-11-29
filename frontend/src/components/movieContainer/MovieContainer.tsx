import { MovieContent } from "../../interfaces";
import "./MovieContainer.css";
import empty_poster_pic from "../../assets/images/empty_poster_pic.png";

interface MovieContainerProps {
  movie: MovieContent;
}

/**
 * MovieContainer Component
 *
 * This component is responsible for displaying individual movie details within a container.
 * It shows the movie's poster, title, and release year. If a movie poster is not available,
 * a default placeholder image or text is displayed.
 *
 * Props:
 * @param {MovieContent} movie - The movie object containing information like the title, poster, and release year.
 *
 * Features:
 * - Displays the movie's poster image. If the poster URL is not valid, a default placeholder image is shown.
 * - Shows the primary title of the movie.
 * - Displays the release year of the movie.
 */
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
