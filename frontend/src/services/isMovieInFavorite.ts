import request from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL } from "../interfaces";
import { QueryClient, useQuery } from "@tanstack/react-query";

/**
 * GraphQL query to check if a movie is in a user's favorites.
 */
const IS_MOVIE_IN_FAVORITES = graphql(`
  query IsMovieInFavorite($userId: ID!, $imdbId: ID!) {
    movieInFavoriteByUserID(userID: $userId, imdbID: $imdbId)
  }
`);

/**
 * Checks if a movie is in a user's favorites.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} imdbID - The IMDb identifier of the movie.
 * @returns {Promise<boolean>} A promise that resolves to true if the movie is in the user's favorites, false otherwise.
 */
const isMovieInFavorites = async (
  userID: string,
  imdbID: string
): Promise<boolean> => {
  const { movieInFavoriteByUserID } = await request(
    SERVER_URL,
    IS_MOVIE_IN_FAVORITES,
    {
      userId: userID,
      imdbId: imdbID,
    }
  );
  return movieInFavoriteByUserID;
};

/**
 * React Query hook to check if a movie is in a user's favorites.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} imdbID - The IMDb identifier of the movie.
 * @returns {object} A query object that includes the data (boolean value), status, and other metadata.
 */
export const useIsMovieInFavorites = (userID: string, imdbID: string) => {
  return useQuery({
    queryKey: ["isMovieInFavortes:" + imdbID + userID],
    queryFn: () => isMovieInFavorites(userID, imdbID),
  });
};

/**
 * Invalidates the query for checking if a movie is in a user's favorites.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} imdbID - The IMDb identifier of the movie.
 * @param {QueryClient} client - The QueryClient instance used to handle queries.
 */
export const invalidateIsMovieInFavorites = async (
  userID: string,
  imdbID: string,
  client: QueryClient
) => {
  await client.invalidateQueries(["isMovieInFavortes:" + imdbID + userID]);
};
