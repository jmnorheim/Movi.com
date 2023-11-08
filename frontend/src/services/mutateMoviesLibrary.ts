import { QueryClient } from "@tanstack/react-query";
import { graphql } from "../generated";
import request from "graphql-request";
import { SERVER_URL } from "../interfaces";

const ADD_MOVIE_TO_LIBRARY = graphql(`
  mutation addMovieToLibrary($libraryId: ID!, $movieId: String!) {
    addMovieToLibrary(libraryID: $libraryId, movieID: $movieId) {
      libraryID
    }
  }
`);

const REMOVE_MOVIE_FROM_LIBRARY = graphql(`
  mutation removeMovieFromLibrary($libraryId: ID!, $movieId: String!) {
    removeMovieFromLibrary(libraryID: $libraryId, movieID: $movieId) {
      libraryID
    }
  }
`);

export const addMovieToLibrary = async (
  queryClient: QueryClient,
  libraryID: string,
  movieID: string
): Promise<string> => {
  const { addMovieToLibrary } = await request(
    SERVER_URL,
    ADD_MOVIE_TO_LIBRARY,
    {
      libraryId: libraryID,
      movieId: movieID,
    }
  );
  await queryClient.invalidateQueries({ queryKey: ["Library: " + libraryID] });
  return addMovieToLibrary.libraryID;
};

export const removeMovieFromLibrary = async (
  queryClient: QueryClient,
  libraryID: string,
  movieID: string
): Promise<string> => {
  const { removeMovieFromLibrary } = await request(
    SERVER_URL,
    REMOVE_MOVIE_FROM_LIBRARY,
    {
      libraryId: libraryID,
      movieId: movieID,
    }
  );
  await queryClient.invalidateQueries({ queryKey: ["Library: " + libraryID] });
  return removeMovieFromLibrary.libraryID;
};
