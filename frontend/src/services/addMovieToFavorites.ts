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
 * Add movie to Favorites.
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
