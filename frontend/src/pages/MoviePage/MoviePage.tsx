import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieAPI";
import { useEffect, useState } from "react";
import { Movie } from "../../interfaces";

/**
 * Render the MoviePage component.
 * @returns {React.Component}
 */
const MoviePage: React.FC = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  if (!movieId) {
    throw new Error("Movie ID is required");
  }

  const { data, isLoading } = useQuery([movieId], () => getMovieById(movieId));

  useEffect(() => {
    if (data) {
      setMovie({ ...data, favorited: false });
    }
  }, [data]);

  //TODO a check to see if the movie is already favorited

  return (
    <>
      {isLoading || movie == null ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h1>{movie.primaryTitle}</h1>
          <p>Movie ID: {movieId}</p>
        </div>
      )}
    </>
  );
};

export default MoviePage;
