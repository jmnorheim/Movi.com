import * as React from "react";

import MovieContainer from "../../components/movieContainer/MovieContainer";
import { MovieContent } from "../../interfaces";
import "./MovieContainerGrid.css";

interface MovieContainerGridProps {
  movies: MovieContent[];
}

const MovieContainerGrid = ({ movies }: MovieContainerGridProps) => {
  return (
    <div className="MovieContainerGrid">
      {movies.map((movie) => (
        <MovieContainer movieContent={movie} key={movie.imdbID} />
      ))}
    </div>
  );
};

export default MovieContainerGrid;
