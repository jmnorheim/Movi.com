import request from "graphql-request";
import { graphql } from "../generated";
import { Library } from "../interfaces";
import { useQuery } from "@tanstack/react-query";

const USER_LIBRARIES = graphql(`
  query GetUsersLibraries($userId: ID!) {
    librariesByUserID(userID: $userId) {
      movies
      name
    }
  }
`);

const getUsersLibraries = async (userID: string): Promise<Library[]> => {
  const { librariesByUserID } = await request(
    "http://localhost:4000/",
    USER_LIBRARIES,
    {
      userId: userID,
    }
  );
  return librariesByUserID as Library[];
};

export const useUsersLibrariesQuery = (userID: string) => {
  return useQuery({
    queryKey: ["Libraries: " + userID],
    queryFn: () => getUsersLibraries(userID),
  });
};
