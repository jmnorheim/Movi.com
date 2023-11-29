import { request } from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL } from "../interfaces";

/**
 * GraphQL query to add a movie to a library.
 */
const ADD_MOVIE_TO_LIBRARY = graphql(`
  mutation AddMovieToLibrary($libraryId: ID!, $movieId: String!) {
    addMovieToLibrary(libraryID: $libraryId, movieID: $movieId) {
      userID
    }
  }
`);

/**
 * Adds a movie to a specific library.
 *
 * This function sends a GraphQL mutation request to add a specified movie to a given library.
 * It is used to update the user's library with new movie selections.
 *
 * @param {string} libraryID - The unique identifier of the library where the movie will be added.
 * @param {string} movieID - The identifier of the movie to be added to the library.
 * @returns {Promise<void>} A promise that resolves once the movie has been successfully added to the library.
 *
 * @throws {Error} Throws an error if the GraphQL request fails or if the server encounters an issue during the process of adding the movie.
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
