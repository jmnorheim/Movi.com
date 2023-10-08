import { MovieContent } from "../../interfaces";
import "./MovieContainer.css";

interface MovieContainerProps {
  movieContent: MovieContent;
}

const MovieContainer = ({ movieContent }: MovieContainerProps) => {
  return (
    <div className="MovieContainer">
      <img src={movieContent.poster} alt="poster" className="ImageContainer" />
      <h3>{movieContent.primaryTitle}</h3>
      <h4>Rating: {movieContent.averageRating}</h4>
    </div>
  );
};

export default MovieContainer;
