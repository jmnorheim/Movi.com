import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieAPI";

/**
 * Render the MoviePage component.
 * @returns {React.Component}
 */
const MoviePage: React.FC = () => {
  const { movieId } = useParams();

  if (!movieId) {
    throw new Error("Movie ID is required");
  }

  const { data: movie, isLoading } = useQuery([movieId], () =>
    getMovieById(movieId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Movie Details</h1>
      <p>Movie ID: {movieId}</p>
    </div>
  );
};

export default MoviePage;
