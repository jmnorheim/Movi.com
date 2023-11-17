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
 * Remove Movie From Library.
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
 * Usequery Remove Movie From Favorites.
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
