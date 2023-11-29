import { graphql } from "../generated";
import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { MovieContent, SERVER_URL } from "../interfaces";

const USER_FAVORITES = graphql(`
  query getFavorites($userId: ID!) {
    favorites(userID: $userId) {
      imdbID
      genres
      primaryTitle
      totalVotes
      startYear
      runtimeMinutes
      poster
      originalTitle
      isAdult
      averageRating
    }
  }
`);

/**
 * Fetches all the favorite movies of a user.
 *
 * @param {string} userID - The unique identifier of the user.
 * @returns {Promise<MovieContent[]>} A promise that resolves to an array of favorite movies (represented by their IMDb-IDs).
 */
const getUserFavorites = async (userID: string): Promise<MovieContent[]> => {
  const { favorites } = await request(SERVER_URL, USER_FAVORITES, {
    userId: userID,
  });

  return favorites as MovieContent[];
};

/**
 * React Query hook for fetching a user's favorite movies.
 *
 * @param {string} userID - The unique identifier of the user.
 * @returns {object} A query object that includes the data (user's favorites), status, and other metadata.
 */
export const useUserFavoritesQuery = (userID: string | undefined) => {
  return useQuery({
    queryKey: ["favorites : " + userID],
    queryFn: () => getUserFavorites(userID!),
    enabled: !!userID,
  });
};
