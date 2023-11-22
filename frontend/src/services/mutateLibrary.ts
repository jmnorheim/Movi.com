import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphql } from "../generated";
import request from "graphql-request";
import { SERVER_URL } from "../interfaces";

/**
 * GraphQL mutation for adding a library to a user.
 */
const ADD_LIBRARY = graphql(`
  mutation addLibraryToUser($userId: ID!, $libraryName: String!) {
    addLibrary(userID: $userId, libraryName: $libraryName) {
      userID
    }
  }
`);

/**
 * Creates a new library for a user.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} libraryName - The name of the new library.
 * @returns {Promise<string>} A promise that resolves to the userID of the user to whom the library was added.
 */
const createLibrary = async (
  userID: string,
  libraryName: string
): Promise<string> => {
  const { addLibrary } = await request(SERVER_URL, ADD_LIBRARY, {
    userId: userID,
    libraryName: libraryName,
  });
  return addLibrary.userID;
};

/**
 * React Query mutation hook to create a new library for a user.
 *
 * @param {string} userID - The unique identifier of the user.
 * @returns {object} A mutation object that includes the mutate function, status, and other metadata.
 */
export const useCreateLibrary = (userID: string) => {
  const client = useQueryClient();

  return useMutation(
    (libraryName: string) => createLibrary(userID, libraryName),
    {
      onSuccess: async () => {
        await client.invalidateQueries({ queryKey: ["Libraries: " + userID] });
      },
    }
  );
};
