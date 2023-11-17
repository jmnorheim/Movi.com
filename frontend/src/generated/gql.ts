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
    "\n  mutation AddMovieToFavorite($userId: ID!, $imdbId: ID!) {\n    addMovieToFavorite(userID: $userId, imdbID: $imdbId) {\n      userID\n    }\n  }\n": types.AddMovieToFavoriteDocument,
    "\n  mutation AddMovieToLibrary($libraryId: ID!, $movieId: String!) {\n    addMovieToLibrary(libraryID: $libraryId, movieID: $movieId) {\n      userID\n    }\n  }\n": types.AddMovieToLibraryDocument,
    "\n  mutation createUser($username: String!, $email: String!, $password: String!) {\n    createUser(username: $username, email: $email, password: $password) {\n      email\n      favorites\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      password\n      userID\n      username\n    }\n  }\n": types.CreateUserDocument,
    "\n  query getLibrary($libraryId: ID!) {\n    libraryByID(libraryID: $libraryId) {\n      movies\n      name\n    }\n  }\n": types.GetLibraryDocument,
    "\n  query LibraryByUserAndName($userId: ID!, $name: String!) {\n    libraryByUserAndName(userID: $userId, name: $name) {\n      libraryID\n      movies\n      name\n    }\n  }\n": types.LibraryByUserAndNameDocument,
    "\n  query GetUser($imdbId: ID!) {\n    movie(imdbID: $imdbId) {\n      averageRating\n      genres\n      imdbID\n      isAdult\n      originalTitle\n      poster\n      primaryTitle\n      runtimeMinutes\n      startYear\n      totalVotes\n    }\n  }\n": types.GetUserDocument,
    "\n  query GetMovies(\n    $limit: Int\n    $offset: Int\n    $searchBy: String\n    $filter: MovieFilter\n    $sortBy: SortType\n  ) {\n    movies(\n      limit: $limit\n      offset: $offset\n      searchBy: $searchBy\n      filter: $filter\n      sortBy: $sortBy\n    ) {\n      count\n      movies {\n        primaryTitle\n        totalVotes\n        imdbID\n        startYear\n        runtimeMinutes\n        poster\n        originalTitle\n        isAdult\n        averageRating\n        genres\n      }\n    }\n  }\n": types.GetMoviesDocument,
    "\n  query GetMovieStats {\n    movieStats {\n      averageRatingRange {\n        max\n        min\n      }\n      releaseYearRange {\n        max\n        min\n      }\n      runtimeMinutesRange {\n        max\n        min\n      }\n      totalVotesRange {\n        max\n        min\n      }\n    }\n  }\n": types.GetMovieStatsDocument,
    "\n  query MoviesByLibraryID($libraryId: ID!) {\n    moviesByLibraryID(libraryID: $libraryId) {\n      imdbID\n      primaryTitle\n      averageRating\n      runtimeMinutes\n    }\n  }\n": types.MoviesByLibraryIdDocument,
    "\n  query GetRecommended($movie: MovieInput!) {\n    getRecommendedMovies(movie: $movie) {\n      totalVotes\n      startYear\n      runtimeMinutes\n      primaryTitle\n      poster\n      originalTitle\n      isAdult\n      imdbID\n      genres\n      averageRating\n    }\n  }\n": types.GetRecommendedDocument,
    "\n  query UserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      userID\n      username\n      password\n      email\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      favorites\n    }\n  }\n": types.UserByEmailDocument,
    "\n  query UserByID($userID: ID!) {\n    userByID(userID: $userID) {\n      userID\n      username\n      password\n      email\n      library {\n        libraryID\n        userID\n        name\n        movies\n      }\n      favorites\n    }\n  }\n": types.UserByIdDocument,
    "\n  query GetUserFavorites($userId: ID!) {\n    userByID(userID: $userId) {\n      favorites\n    }\n  }\n": types.GetUserFavoritesDocument,
    "\n  query GetUsersLibraries($userId: ID!) {\n    librariesByUserID(userID: $userId) {\n      movies\n      name\n      libraryID\n    }\n  }\n": types.GetUsersLibrariesDocument,
    "\n  query IsMovieInFavorite($userId: ID!, $imdbId: ID!) {\n    movieInFavoriteByUserID(userID: $userId, imdbID: $imdbId)\n  }\n": types.IsMovieInFavoriteDocument,
    "\n  mutation addLibraryToUser($userId: ID!, $libraryName: String!) {\n    addLibrary(userID: $userId, libraryName: $libraryName) {\n      userID\n    }\n  }\n": types.AddLibraryToUserDocument,
    "\n  mutation removeMovieFromLibrary($libraryId: ID!, $movieId: String!) {\n    removeMovieFromLibrary(libraryID: $libraryId, movieID: $movieId) {\n      libraryID\n    }\n  }\n": types.RemoveMovieFromLibraryDocument,
    "\n  query VerifyPassword($email: String!, $password: String!) {\n    verifyPassword(email: $email, password: $password)\n  }\n": types.VerifyPasswordDocument,
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
export function graphql(source: "\n  mutation AddMovieToFavorite($userId: ID!, $imdbId: ID!) {\n    addMovieToFavorite(userID: $userId, imdbID: $imdbId) {\n      userID\n    }\n  }\n"): (typeof documents)["\n  mutation AddMovieToFavorite($userId: ID!, $imdbId: ID!) {\n    addMovieToFavorite(userID: $userId, imdbID: $imdbId) {\n      userID\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddMovieToLibrary($libraryId: ID!, $movieId: String!) {\n    addMovieToLibrary(libraryID: $libraryId, movieID: $movieId) {\n      userID\n    }\n  }\n"): (typeof documents)["\n  mutation AddMovieToLibrary($libraryId: ID!, $movieId: String!) {\n    addMovieToLibrary(libraryID: $libraryId, movieID: $movieId) {\n      userID\n    }\n  }\n"];
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
export function graphql(source: "\n  query LibraryByUserAndName($userId: ID!, $name: String!) {\n    libraryByUserAndName(userID: $userId, name: $name) {\n      libraryID\n      movies\n      name\n    }\n  }\n"): (typeof documents)["\n  query LibraryByUserAndName($userId: ID!, $name: String!) {\n    libraryByUserAndName(userID: $userId, name: $name) {\n      libraryID\n      movies\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser($imdbId: ID!) {\n    movie(imdbID: $imdbId) {\n      averageRating\n      genres\n      imdbID\n      isAdult\n      originalTitle\n      poster\n      primaryTitle\n      runtimeMinutes\n      startYear\n      totalVotes\n    }\n  }\n"): (typeof documents)["\n  query GetUser($imdbId: ID!) {\n    movie(imdbID: $imdbId) {\n      averageRating\n      genres\n      imdbID\n      isAdult\n      originalTitle\n      poster\n      primaryTitle\n      runtimeMinutes\n      startYear\n      totalVotes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMovies(\n    $limit: Int\n    $offset: Int\n    $searchBy: String\n    $filter: MovieFilter\n    $sortBy: SortType\n  ) {\n    movies(\n      limit: $limit\n      offset: $offset\n      searchBy: $searchBy\n      filter: $filter\n      sortBy: $sortBy\n    ) {\n      count\n      movies {\n        primaryTitle\n        totalVotes\n        imdbID\n        startYear\n        runtimeMinutes\n        poster\n        originalTitle\n        isAdult\n        averageRating\n        genres\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMovies(\n    $limit: Int\n    $offset: Int\n    $searchBy: String\n    $filter: MovieFilter\n    $sortBy: SortType\n  ) {\n    movies(\n      limit: $limit\n      offset: $offset\n      searchBy: $searchBy\n      filter: $filter\n      sortBy: $sortBy\n    ) {\n      count\n      movies {\n        primaryTitle\n        totalVotes\n        imdbID\n        startYear\n        runtimeMinutes\n        poster\n        originalTitle\n        isAdult\n        averageRating\n        genres\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMovieStats {\n    movieStats {\n      averageRatingRange {\n        max\n        min\n      }\n      releaseYearRange {\n        max\n        min\n      }\n      runtimeMinutesRange {\n        max\n        min\n      }\n      totalVotesRange {\n        max\n        min\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMovieStats {\n    movieStats {\n      averageRatingRange {\n        max\n        min\n      }\n      releaseYearRange {\n        max\n        min\n      }\n      runtimeMinutesRange {\n        max\n        min\n      }\n      totalVotesRange {\n        max\n        min\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MoviesByLibraryID($libraryId: ID!) {\n    moviesByLibraryID(libraryID: $libraryId) {\n      imdbID\n      primaryTitle\n      averageRating\n      runtimeMinutes\n    }\n  }\n"): (typeof documents)["\n  query MoviesByLibraryID($libraryId: ID!) {\n    moviesByLibraryID(libraryID: $libraryId) {\n      imdbID\n      primaryTitle\n      averageRating\n      runtimeMinutes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecommended($movie: MovieInput!) {\n    getRecommendedMovies(movie: $movie) {\n      totalVotes\n      startYear\n      runtimeMinutes\n      primaryTitle\n      poster\n      originalTitle\n      isAdult\n      imdbID\n      genres\n      averageRating\n    }\n  }\n"): (typeof documents)["\n  query GetRecommended($movie: MovieInput!) {\n    getRecommendedMovies(movie: $movie) {\n      totalVotes\n      startYear\n      runtimeMinutes\n      primaryTitle\n      poster\n      originalTitle\n      isAdult\n      imdbID\n      genres\n      averageRating\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetUsersLibraries($userId: ID!) {\n    librariesByUserID(userID: $userId) {\n      movies\n      name\n      libraryID\n    }\n  }\n"): (typeof documents)["\n  query GetUsersLibraries($userId: ID!) {\n    librariesByUserID(userID: $userId) {\n      movies\n      name\n      libraryID\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsMovieInFavorite($userId: ID!, $imdbId: ID!) {\n    movieInFavoriteByUserID(userID: $userId, imdbID: $imdbId)\n  }\n"): (typeof documents)["\n  query IsMovieInFavorite($userId: ID!, $imdbId: ID!) {\n    movieInFavoriteByUserID(userID: $userId, imdbID: $imdbId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addLibraryToUser($userId: ID!, $libraryName: String!) {\n    addLibrary(userID: $userId, libraryName: $libraryName) {\n      userID\n    }\n  }\n"): (typeof documents)["\n  mutation addLibraryToUser($userId: ID!, $libraryName: String!) {\n    addLibrary(userID: $userId, libraryName: $libraryName) {\n      userID\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeMovieFromLibrary($libraryId: ID!, $movieId: String!) {\n    removeMovieFromLibrary(libraryID: $libraryId, movieID: $movieId) {\n      libraryID\n    }\n  }\n"): (typeof documents)["\n  mutation removeMovieFromLibrary($libraryId: ID!, $movieId: String!) {\n    removeMovieFromLibrary(libraryID: $libraryId, movieID: $movieId) {\n      libraryID\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query VerifyPassword($email: String!, $password: String!) {\n    verifyPassword(email: $email, password: $password)\n  }\n"): (typeof documents)["\n  query VerifyPassword($email: String!, $password: String!) {\n    verifyPassword(email: $email, password: $password)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;