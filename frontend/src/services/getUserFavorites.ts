import { graphql } from "../generated";
import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "../interfaces";

const USER_FAVORITES = graphql(`
  query GetUserFavorites($userId: ID!) {
    userByID(userID: $userId) {
      favorites
    }
  }
`);

/**
 * Fetches the list of favorite movies for a given user.
 *
 * @param {string} userID - The unique identifier of the user.
 * @returns {Promise<string[]>} A promise that resolves to an array of favorite movies (represented by their IMDb IDs).
 */
const getUserFavorites = async (userID: string): Promise<string[]> => {
  const { userByID } = await request(SERVER_URL, USER_FAVORITES, {
    userId: userID,
  });

  return userByID.favorites;
};

/**
 * React Query hook for fetching a user's favorite movies.
 *
 * @param {string} userID - The unique identifier of the user.
 * @returns {object} A query object that includes the data (user's favorites), status, and other metadata.
 */
export const useUserFavoritesQuery = (userID: string) => {
  return useQuery({
    queryKey: ["Favorites: " + userID],
    queryFn: () => getUserFavorites(userID),
  });
};
