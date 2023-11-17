import request from "graphql-request";
import { graphql } from "../generated";
import { Library, SERVER_URL } from "../interfaces";
import { useQuery } from "@tanstack/react-query";

const USER_LIBRARIES = graphql(`
  query GetUsersLibraries($userId: ID!) {
    librariesByUserID(userID: $userId) {
      movies
      name
      libraryID
    }
  }
`);

const getUsersLibraries = async (userID: string): Promise<Library[]> => {
  const { librariesByUserID } = await request(SERVER_URL, USER_LIBRARIES, {
    userId: userID,
  });
  return librariesByUserID as Library[];
};

export const useUsersLibrariesQuery = (userID: string | undefined) => {
  return useQuery({
    queryKey: ["Libraries: " + userID],
    queryFn: () => getUsersLibraries(userID!),
    enabled: !!userID,
  });
};
