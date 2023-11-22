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

/**
 * Fetches a list of recommended movies based on a given movie's attributes.
 *
 * @param {MovieContent} movie - The movie object based on which recommendations will be generated.
 * @returns {Promise<MovieContent[]>} A promise that resolves to an array of recommended movies.
 */
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
 * Custom React Query hook for fetching recommended movies based on a specific movie.
 *
 * @param {MovieContent | null} movie - The movie object to base the recommendations on.
 * @returns The query object returned by useQuery, containing the list of recommended movies and query state.
 * Note: The query is only enabled when a valid movie object is provided.
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
