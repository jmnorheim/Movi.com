import { request } from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL } from "../interfaces";

/**
 * GraphQL query to authenticate a user.
 */
const ADD_MOVIE_TO_FAVORITES = graphql(`
  mutation AddMovieToFavorite($userId: ID!, $imdbId: ID!) {
    addMovieToFavorite(userID: $userId, imdbID: $imdbId) {
      userID
    }
  }
`);

/**
 * Adds a movie to a user's list of favorites.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {string} imdbID - The IMDb identifier of the movie to be added to favorites.
 * @returns {Promise<void>} A promise that resolves once the movie has been added to the user's favorites.
 *
 * @throws {Error} Throws an error if the GraphQL request fails or if the server encounters an issue during the update process.
 */
export const addMovieToFavorite = async (
  userId: string,
  imdbID: string
): Promise<void> => {
  await request(SERVER_URL, ADD_MOVIE_TO_FAVORITES, {
    userId: userId,
    imdbId: imdbID,
  });
};
