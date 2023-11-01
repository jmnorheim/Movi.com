import { graphql } from "../generated";
import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";

const USER_FAVORITES = graphql(`
  query GetUserFavorites($userId: ID!) {
    userByID(userID: $userId) {
      favorites
    }
  }
`);

const GetUserFavorites = async (userID: string): Promise<string[]> => {
  const { userByID } = await request("http://localhost:4000/", USER_FAVORITES, {
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
