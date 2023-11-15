import { useAuth } from "../../services/auth/AuthContext";
import MovieContainer from "../../components/movieContainer/MovieContainer";
import { Movie, MovieContent } from "../../interfaces";
import "./MovieContainerGrid.css";
import { Link } from "react-router-dom";
import { useState } from "react";

// Icons
import { ArrowDownIcon } from "../../assets/icons/ArrowDownIcon";
import AddToLibraryButton from "../addToLibraryButton/AddToLibraryButton";

interface MovieContainerGridProps {
  movies: MovieContent[];
}

const MovieContainerGrid = ({ movies }: MovieContainerGridProps) => {
  const { isLoggedIn, email } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [addedToLibraries, setAddedToLibraries] = useState<
    Record<string, Record<string, boolean>>
  >({});

  return (
    <div className="MovieContainerGrid">
      {movies.map((movie, index) => (
        <div key={index} style={{ position: "relative" }}>
          <Link to={"/movie/" + movie.imdbID} key={movie.imdbID}>
            <MovieContainer movie={movie} />
          </Link>
          <AddToLibraryButton />
        </div>
      ))}
    </div>
  );
};

export default MovieContainerGrid;
