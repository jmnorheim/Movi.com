import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphql } from "../generated";
import request from "graphql-request";
import { SERVER_URL } from "../interfaces";

const ADD_LIBRARY = graphql(`
  mutation addLibraryToUser($userId: ID!, $libraryName: String!) {
    addLibrary(userID: $userId, libraryName: $libraryName) {
      userID
    }
  }
`);

const addLibrary = async (
  userID: string,
  libraryName: string
): Promise<string> => {
  const { addLibrary } = await request(SERVER_URL, ADD_LIBRARY, {
    userId: userID,
    libraryName: libraryName,
  });
  return addLibrary.userID;
};

export const useAddLibrary = (userID: string, libraryName: string) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => addLibrary(userID, libraryName),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["Libraries: " + userID] });
    },
  });
};
