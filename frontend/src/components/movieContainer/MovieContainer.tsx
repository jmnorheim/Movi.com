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
    <div className="frame">
      <img className="rectangle" alt="Rectangle" src={movie.poster} />
      <div className="div">
        <div className="text-wrapper">{movie.primaryTitle}</div>
        <button className="button">
          <div className="text-wrapper-2">Add To Library</div>
          <ArrowDownIcon className="icon-instance" />
        </button>
      </div>
      <div className="text-wrapper-3">{movie.startYear}</div>
      <HeartIcon className="vuesax-linear-heart" />
    </div>
  );
};

//   return (
//     <div className="MovieContainer">
//       <img src={movie.poster} alt="poster" className="ImageContainer" />
//       <h3>{movie.primaryTitle}</h3>
//       <h4>Rating: {movie.averageRating}</h4>
//     </div>
//   );
// };

export default MovieContainer;
