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
        <div
          key={index}
          style={{ position: "relative", textDecoration: "none" }}
        >
          <Link
            to={"/movie/" + movie.imdbID}
            key={movie.imdbID}
            style={{ textDecoration: "none" }}
          >
            <MovieContainer movie={movie} />
          </Link>
          <AddToLibraryButton
            imdbID={movie.imdbID}
            width="120px"
            height="25px"
            fontSize="12px"
            dropdownPosition={{ top: "97.8%", left: "55%" }}
            dropDownItemMaxWidth="140px"
          />
        </div>
      ))}
    </div>
  );
};

export default MovieContainerGrid;
