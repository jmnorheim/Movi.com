import { request } from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL } from "../interfaces";
import { useQueryClient, useMutation } from "@tanstack/react-query";

/**
 * GraphQL mutation for removing movie from favorites.
 */
const REMOVE_MOVIE_FROM_FAVORITES = graphql(`
  mutation Mutation($userId: ID!, $imdbId: ID!) {
    removeMovieFromFavorite(userID: $userId, imdbID: $imdbId) {
      userID
    }
  }
`);

/**
 * Removes a movie from a user's favorite list.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} imdbID - The IMDb identifier of the movie to be removed.
 * @returns {Promise<void>} A promise that resolves when the movie is successfully removed from favorites.
 */
export const removeMovieFromFavorites = async (
  userID: string,
  imdbID: string
): Promise<void> => {
  await request(SERVER_URL, REMOVE_MOVIE_FROM_FAVORITES, {
    userId: userID,
    imdbId: imdbID,
  });
};

/**
 * React Query mutation hook for removing a movie from a user's favorites.
 *
 * @param {string} userID - The unique identifier of the user.
 * @returns {object} A mutation object that includes the mutate function, status, and other metadata.
 *
 * This mutation hook takes an IMDb ID as an argument and executes the removal process.
 * Upon successful completion, it invalidates queries related to the user's favorites to
 * ensure the UI reflects the updated list of favorite movies.
 */
export const useRemoveMovieFromFavorites = (userID: string) => {
  const client = useQueryClient();

  return useMutation(
    (imdbID: string) => removeMovieFromFavorites(userID, imdbID),
    {
      onSuccess: async () => {
        await client.invalidateQueries({ queryKey: ["favorites : " + userID] });
      },
    }
  );
};
