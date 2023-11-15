import { request } from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL } from "../interfaces";

/**
 * GraphQL query to authenticate a user.
 */
const ADD_MOVIE_TO_LIBRARY = graphql(`
  mutation AddMovieToLibrary($libraryId: ID!, $movieId: String!) {
    addMovieToLibrary(libraryID: $libraryId, movieID: $movieId) {
      userID
    }
  }
`);

/**
 * Add movie to Library.
 */
export const addMovieToLibrary = async (
  libraryID: string,
  movieID: string
): Promise<void> => {
  await request(SERVER_URL, ADD_MOVIE_TO_LIBRARY, {
    libraryId: libraryID,
    movieId: movieID,
  });
};
