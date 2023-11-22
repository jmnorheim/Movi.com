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

/**
 * Fetches the list of libraries associated with a given user.
 *
 * @param {string} userID - The unique identifier of the user.
 * @returns {Promise<Library[]>} A promise that resolves to an array of Library objects.
 */
const getUsersLibraries = async (userID: string): Promise<Library[]> => {
  const { librariesByUserID } = await request(SERVER_URL, USER_LIBRARIES, {
    userId: userID,
  });
  return librariesByUserID as Library[];
};

/**
 * React Query hook for fetching a user's libraries.
 *
 * @param {string | undefined} userID - The unique identifier of the user. Can be undefined.
 * @returns {object} A query object that includes the data (user's libraries), status, and other metadata.
 */
export const useUsersLibrariesQuery = (userID: string | undefined) => {
  return useQuery({
    queryKey: ["Libraries: " + userID],
    queryFn: () => getUsersLibraries(userID!),
    enabled: !!userID,
  });
};
