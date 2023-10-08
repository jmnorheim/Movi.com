import * as React from "react";

import MovieContainer from "../../components/movieContainer/MovieContainer";
import { MovieContent } from "../../interfaces";
import "./MovieContainerGrid.css";

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
        <MovieContainer
          movieContent={movie}
          key={movie.imdbID}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default MovieContainerGrid;
