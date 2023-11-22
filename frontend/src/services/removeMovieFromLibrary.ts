import { request } from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL } from "../interfaces";
import { useQueryClient, useMutation } from "@tanstack/react-query";

/**
 * GraphQL mutation for removing movie from library.
 */
const REMOVE_MOVIE_FROM_LIBRARY = graphql(`
  mutation RemoveMovieFromLibrary($libraryId: ID!, $movieId: String!) {
    removeMovieFromLibrary(libraryID: $libraryId, movieID: $movieId) {
      libraryID
    }
  }
`);

/**
 * Removes a movie from a specified library.
 *
 * @param {string} libraryID - The unique identifier of the library.
 * @param {string} imdbID - The IMDb identifier of the movie to be removed.
 * @returns {Promise<void>} A promise that resolves when the movie is successfully removed from the library.
 */
export const removeMovieFromLibrary = async (
  libraryID: string,
  imdbID: string
): Promise<void> => {
  const response = await request(SERVER_URL, REMOVE_MOVIE_FROM_LIBRARY, {
    libraryId: libraryID,
    movieId: imdbID,
  });
};

/**
 * React Query mutation hook for removing a movie from a library.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} libraryID - The unique identifier of the library.
 * @returns {object} A mutation object that includes the mutate function, status, and other metadata.
 *
 * This mutation hook takes an IMDb ID as an argument and executes the removal process.
 * Upon successful completion, it invalidates queries related to the specific library to
 * ensure the UI reflects the updated list of movies in the library.
 */
export const useRemoveMovieFromLibrary = (
  userID: string,
  libraryID: string
) => {
  const client = useQueryClient();

  return useMutation(
    (imdbID: string) => removeMovieFromLibrary(libraryID, imdbID),
    {
      onSuccess: async () => {
        await client.invalidateQueries({
          queryKey: [libraryID + " : " + userID],
        });
      },
    }
  );
};
