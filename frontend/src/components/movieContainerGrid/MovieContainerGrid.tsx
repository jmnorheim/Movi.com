import * as React from "react";

import MovieContainer from "../../components/movieContainer/MovieContainer";
import { MovieContent } from "../../interfaces";
import "./MovieContainerGrid.css";
import { Link } from "react-router-dom";

interface MovieContainerGridProps {
  movies: MovieContent[];
  onToggleFavorite: (imdbID: string) => void;
}

const MovieContainerGrid = ({
  movies,
  onToggleFavorite,
}: MovieContainerGridProps) => {
  return (
    <div className="MovieContainerGrid">
      {movies.map((movie) => (
        <Link to={"/movie/" + movie.imdbID} key={movie.imdbID}>
          <MovieContainer
            movieContent={movie}
            onToggleFavorite={onToggleFavorite}
          />
        </Link>
      ))}
    </div>
  );
};

export default MovieContainerGrid;
