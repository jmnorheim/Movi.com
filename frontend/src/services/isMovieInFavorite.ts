import request from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL } from "../interfaces";
import { QueryClient, useQuery } from "@tanstack/react-query";

const IS_MOVIE_IN_FAVORITES = graphql(`
  query IsMovieInFavorite($userId: ID!, $imdbId: ID!) {
    movieInFavoriteByUserID(userID: $userId, imdbID: $imdbId)
  }
`);

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

export const useIsMovieInFavorites = (userID: string, imdbID: string) => {
  return useQuery({
    queryKey: ["isMovieInFavortes:" + imdbID + userID],
    queryFn: () => isMovieInFavorites(userID, imdbID),
  });
};

export const invalidateIsMovieInFavorites = async (
  userID: string,
  imdbID: string,
  client: QueryClient
) => {
  await client.invalidateQueries(["isMovieInFavortes:" + imdbID + userID]);
};
