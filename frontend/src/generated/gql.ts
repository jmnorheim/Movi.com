/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createUser($username: String!, $email: String!, $password: String!) {\n    createUser(username: $username, email: $email, password: $password) {\n      email\n      favorites\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      password\n      userID\n      username\n    }\n  }\n": types.CreateUserDocument,
    "\n  query getLibrary($libraryId: ID!) {\n    libraryByID(libraryID: $libraryId) {\n      movies\n      name\n    }\n  }\n": types.GetLibraryDocument,
    "\n  query UserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      userID\n      username\n      password\n      email\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      favorites\n    }\n  }\n": types.UserByEmailDocument,
    "\n  query UserByID($userID: ID!) {\n    userByID(userID: $userID) {\n      userID\n      username\n      password\n      email\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      favorites\n    }\n  }\n": types.UserByIdDocument,
    "\n  query GetUserFavorites($userId: ID!) {\n    userByID(userID: $userId) {\n      favorites\n    }\n  }\n": types.GetUserFavoritesDocument,
    "\n  query GetUsersLibraries($userId: ID!) {\n    librariesByUserID(userID: $userId) {\n      movies\n      name\n    }\n  }\n": types.GetUsersLibrariesDocument,
    "\n  mutation addLibraryToUser($userId: ID!, $libraryName: String!) {\n    addLibrary(userID: $userId, libraryName: $libraryName) {\n      userID\n    }\n  }\n": types.AddLibraryToUserDocument,
    "\n  mutation addMovieToLibrary($libraryId: ID!, $movieId: String!) {\n    addMovieToLibrary(libraryID: $libraryId, movieID: $movieId) {\n      libraryID\n    }\n  }\n": types.AddMovieToLibraryDocument,
    "\n  mutation removeMovieFromLibrary($libraryId: ID!, $movieId: String!) {\n    removeMovieFromLibrary(libraryID: $libraryId, movieID: $movieId) {\n      libraryID\n    }\n  }\n": types.RemoveMovieFromLibraryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($username: String!, $email: String!, $password: String!) {\n    createUser(username: $username, email: $email, password: $password) {\n      email\n      favorites\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      password\n      userID\n      username\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($username: String!, $email: String!, $password: String!) {\n    createUser(username: $username, email: $email, password: $password) {\n      email\n      favorites\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      password\n      userID\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getLibrary($libraryId: ID!) {\n    libraryByID(libraryID: $libraryId) {\n      movies\n      name\n    }\n  }\n"): (typeof documents)["\n  query getLibrary($libraryId: ID!) {\n    libraryByID(libraryID: $libraryId) {\n      movies\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      userID\n      username\n      password\n      email\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      favorites\n    }\n  }\n"): (typeof documents)["\n  query UserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      userID\n      username\n      password\n      email\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      favorites\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserByID($userID: ID!) {\n    userByID(userID: $userID) {\n      userID\n      username\n      password\n      email\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      favorites\n    }\n  }\n"): (typeof documents)["\n  query UserByID($userID: ID!) {\n    userByID(userID: $userID) {\n      userID\n      username\n      password\n      email\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      favorites\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserFavorites($userId: ID!) {\n    userByID(userID: $userId) {\n      favorites\n    }\n  }\n"): (typeof documents)["\n  query GetUserFavorites($userId: ID!) {\n    userByID(userID: $userId) {\n      favorites\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsersLibraries($userId: ID!) {\n    librariesByUserID(userID: $userId) {\n      movies\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetUsersLibraries($userId: ID!) {\n    librariesByUserID(userID: $userId) {\n      movies\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addLibraryToUser($userId: ID!, $libraryName: String!) {\n    addLibrary(userID: $userId, libraryName: $libraryName) {\n      userID\n    }\n  }\n"): (typeof documents)["\n  mutation addLibraryToUser($userId: ID!, $libraryName: String!) {\n    addLibrary(userID: $userId, libraryName: $libraryName) {\n      userID\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addMovieToLibrary($libraryId: ID!, $movieId: String!) {\n    addMovieToLibrary(libraryID: $libraryId, movieID: $movieId) {\n      libraryID\n    }\n  }\n"): (typeof documents)["\n  mutation addMovieToLibrary($libraryId: ID!, $movieId: String!) {\n    addMovieToLibrary(libraryID: $libraryId, movieID: $movieId) {\n      libraryID\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeMovieFromLibrary($libraryId: ID!, $movieId: String!) {\n    removeMovieFromLibrary(libraryID: $libraryId, movieID: $movieId) {\n      libraryID\n    }\n  }\n"): (typeof documents)["\n  mutation removeMovieFromLibrary($libraryId: ID!, $movieId: String!) {\n    removeMovieFromLibrary(libraryID: $libraryId, movieID: $movieId) {\n      libraryID\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;