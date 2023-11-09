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
