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
 * Remove Movie From Favorites.
 */
export const removeMovieFromFavorites = async (
  userID: string,
  imdbID: string
): Promise<void> => {
  const endpoint = SERVER_URL;
  const response = await request(endpoint, REMOVE_MOVIE_FROM_FAVORITES, {
    userId: userID,
    imdbId: imdbID,
  });
};

/**
 * Usequery Remove Movie From Favorites.
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
