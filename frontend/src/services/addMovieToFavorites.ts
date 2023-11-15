import { request } from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL } from "../interfaces";

/**
 * GraphQL query to authenticate a user.
 */
const ADD_MOVIE_TO_FAVORITES = graphql(`
  mutation Mutation($userId: ID!, $imdbId: ID!) {
    addMovieToFavorite(userID: $userId, imdbID: $imdbId) {
      username
    }
  }
`);

/**
 * Add movie to Library.
 */
export const addMovieToFavorite = async (
  userId: string,
  imdbID: string
): Promise<string> => {
  const { addMovieToFavorite } = await request(
    SERVER_URL,
    ADD_MOVIE_TO_FAVORITES,
    {
      userId: userId,
      imdbId: imdbID,
    }
  );
  return addMovieToFavorite.username as string;
};
