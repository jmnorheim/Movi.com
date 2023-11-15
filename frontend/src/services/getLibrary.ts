import { graphql } from "../generated";
import request from "graphql-request";
import { Library, SERVER_URL } from "../interfaces";
import { useQuery } from "@tanstack/react-query";

const GET_LIBRARY = graphql(`
  query getLibrary($libraryId: ID!) {
    libraryByID(libraryID: $libraryId) {
      movies
      name
    }
  }
`);

const getLibrary = async (libraryID: string): Promise<Library> => {
  const { libraryByID } = await request(SERVER_URL, GET_LIBRARY, {
    libraryId: libraryID,
  });
  return libraryByID as Library;
};

export const useLibraryQuery = (libraryID: string) => {
  return useQuery({
    queryKey: ["Library: " + libraryID],
    queryFn: () => getLibrary(libraryID),
  });
};

// getLibraryByUserAndName
const GET_LIBRARY_BY_USER_AND_NAME = graphql(`
  query LibraryByUserAndName($userId: ID!, $name: String!) {
    libraryByUserAndName(userID: $userId, name: $name) {
      libraryID
      movies
      name
    }
  }
`);

export const getLibraryByUserAndName = async (
  userID: string,
  libraryName: string
): Promise<Library> => {
  const { libraryByUserAndName } = await request(
    SERVER_URL,
    GET_LIBRARY_BY_USER_AND_NAME,
    {
      userId: userID,
      name: libraryName,
    }
  );
  return libraryByUserAndName as Library;
};

export const useLibraryByUserAndNameQuery = (
  userID: string,
  libraryName: string | undefined
) => {
  return useQuery({
    queryKey: ["Library: " + userID, libraryName],
    queryFn: () => getLibraryByUserAndName(userID, libraryName!),
    enabled: !!libraryName,
  });
};
