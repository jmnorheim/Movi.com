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

/**
 * Fetches a library's data by its unique identifier.
 *
 * @param {string} libraryID - The unique identifier of the library.
 * @returns {Promise<Library>} A promise that resolves to the library's data, including movies and name.
 */
const getLibrary = async (libraryID: string): Promise<Library> => {
  const { libraryByID } = await request(SERVER_URL, GET_LIBRARY, {
    libraryId: libraryID,
  });
  return libraryByID as Library;
};

/**
 * Custom React Query hook for fetching a library by its ID.
 *
 * @param {string} libraryID - The unique identifier of the library to fetch.
 * @returns The query object returned by useQuery, containing the library's data and query state.
 */
export const useLibraryQuery = (libraryID: string) => {
  return useQuery({
    queryKey: ["Library: " + libraryID],
    queryFn: () => getLibrary(libraryID),
  });
};

// getLibraryByUserAndName, These are not used yet but will be used in the future when we have multiple users accessing their others libraries
const GET_LIBRARY_BY_USER_AND_NAME = graphql(`
  query LibraryByUserAndName($userId: ID!, $name: String!) {
    libraryByUserAndName(userID: $userId, name: $name) {
      libraryID
      movies
      name
    }
  }
`);

/**
 * Fetches a library's data based on the user ID and library name.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} libraryName - The name of the library.
 * @returns {Promise<Library>} A promise that resolves to the library's data if found.
 */
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

/**
 * Custom React Query hook for fetching a library based on the user ID and library name.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string | undefined} libraryName - The name of the library, or undefined if not yet set.
 * @returns The query object returned by useQuery, containing the library's data and query state.
 */
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
