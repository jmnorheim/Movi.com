import { graphql } from "../generated";
import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "../interfaces";

const USER_FAVORITES = graphql(`
  query GetUserFavorites($userId: ID!) {
    userByID(userID: $userId) {
      favorites
    }
  }
`);

const GetUserFavorites = async (userID: string): Promise<string[]> => {
  const { userByID } = await request(SERVER_URL, USER_FAVORITES, {
    userId: userID,
  });

  return userByID.favorites;
};

export const useUserFavoritesQuery = (userID: string) => {
  return useQuery({
    queryKey: ["Favorites: " + userID],
    queryFn: () => GetUserFavorites(userID),
  });
};
