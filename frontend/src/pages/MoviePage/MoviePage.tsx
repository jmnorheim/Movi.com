import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieAPI";
import { useEffect, useState } from "react";
import { Movie } from "../../interfaces";
import { Typography } from "@mui/material";
import {
  StyledInfoContainer,
  StyledMovieContainer,
  StyledPoster,
} from "./MoviePageStyles";

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
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      ) : (
        <StyledMovieContainer>
          <Typography variant="h2" gutterBottom align="center">
            {movie.primaryTitle}
          </Typography>
          <StyledPoster src={movie.poster} alt="poster" />
          <StyledInfoContainer>
            <Typography variant="h5">
              Original title: {movie.originalTitle}
            </Typography>
            <Typography variant="h5">Rating: {movie.averageRating}</Typography>
            <Typography variant="h5">
              Total votes: {movie.totalVotes}
            </Typography>
            <Typography variant="h5">
              Runtime: {movie.runtimeMinutes} minutes
            </Typography>
            <Typography variant="h5">
              Genres: {movie.genres.toString()}
            </Typography>
            <Typography variant="subtitle1">Movie ID: {movieId}</Typography>
          </StyledInfoContainer>
        </StyledMovieContainer>
      )}
    </>
  );
};

export default MoviePage;
