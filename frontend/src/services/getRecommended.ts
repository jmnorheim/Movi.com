import request from "graphql-request";
import { graphql } from "../generated";
import { MovieContent, SERVER_URL } from "../interfaces";
import { useQuery } from "@tanstack/react-query";

const RECOMMENDED_MOVIES = graphql(`
  query GetRecommended($movie: MovieInput!) {
    getRecommendedMovies(movie: $movie) {
      totalVotes
      startYear
      runtimeMinutes
      primaryTitle
      poster
      originalTitle
      isAdult
      imdbID
      genres
      averageRating
    }
  }
`);

const getRecommendedMovies = async (
  movie: MovieContent
): Promise<MovieContent[]> => {
  const { getRecommendedMovies } = await request(
    SERVER_URL,
    RECOMMENDED_MOVIES,
    {
      movie: movie,
    }
  );

  return getRecommendedMovies as MovieContent[];
};

/**
 * React Query hook for recommended movies based on a movie.
 * @param {MovieContent} movie
 * @returns {object}
 */
export const useRecommendedMovies = (movie: MovieContent | null) => {
  return useQuery({
    queryKey: ["Recommended Movies for:", movie],
    queryFn: () => {
      return getRecommendedMovies(movie!);
    },
    enabled: !!movie,
  });
};
