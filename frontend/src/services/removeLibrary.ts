import { request } from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL } from "../interfaces";
import { useQueryClient, useMutation } from "@tanstack/react-query";

/**
 * GraphQL mutation for removing library.
 */
const REMOVE_LIBRARY = graphql(`
  mutation RemoveLibrary($userId: ID!, $libraryId: String!) {
    removeLibrary(userID: $userId, libraryID: $libraryId) {
      userID
    }
  }
`);

/**
 * Removes a specified library from a user's account.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} libraryID - The unique identifier of the library to be removed.
 * @returns {Promise<void>} A promise that resolves when the library has been successfully removed.
 */
export const removeLibrary = async (
  userID: string,
  libraryID: string
): Promise<void> => {
  await request(SERVER_URL, REMOVE_LIBRARY, {
    userId: userID,
    libraryId: libraryID,
  });
};

/**
 * React Query mutation hook to remove a library from a user's account.
 *
 * @param {string} userID - The unique identifier of the user.
 * @param {string} libraryID - The unique identifier of the library to be removed.
 * @returns {object} A mutation object that includes the mutate function, status, and other metadata.
 */
export const useRemoveLibrary = (userID: string, libraryID: string) => {
  const client = useQueryClient();

  return useMutation(() => removeLibrary(userID, libraryID), {
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: ["Libraries: " + userID],
      });
    },
  });
};
