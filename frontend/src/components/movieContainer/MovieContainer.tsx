import { MovieContent } from "../../interfaces";
import "./MovieContainer.css";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import StarIcon from "@mui/icons-material/Star";

interface MovieContainerProps {
  movieContent: MovieContent;
  onToggleFavorite: (imdbID: string) => void;
}

const MovieContainer = ({
  movieContent,
  onToggleFavorite,
}: MovieContainerProps) => {
  return (
    <div className="MovieContainer">
      <img src={movieContent.poster} alt="poster" className="ImageContainer" />
      <h3>{movieContent.primaryTitle}</h3>
      <h4>Rating: {movieContent.averageRating}</h4>
    </div>
  );
};

export default MovieContainer;
