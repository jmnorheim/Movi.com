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
 * Remove Library.
 */
export const removeLibrary = async (
  userID: string,
  libraryID: string
): Promise<void> => {
  const endpoint = SERVER_URL;
  const response = await request(endpoint, REMOVE_LIBRARY, {
    userId: userID,
    libraryId: libraryID,
  });
};

/**
 * Usequery Remove Library
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
