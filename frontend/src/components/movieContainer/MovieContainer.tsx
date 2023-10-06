import { MovieContent } from "../../interfaces";

interface MovieContainerProps {
  movieContent: MovieContent;
}

const MovieContainer = ({ movieContent }: MovieContainerProps) => {
  return (
    <div className="MovieContainer">
      <img src={movieContent.poster} alt="poster" />
      <h3>Movie Name: {movieContent.primaryTitle}</h3>
      <h4>{movieContent.averageRating}</h4>
    </div>
  );
};

export default MovieContainer;
