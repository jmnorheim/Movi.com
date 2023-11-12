/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Library = {
  __typename?: 'Library';
  libraryID: Scalars['ID']['output'];
  movies: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  userID: Scalars['ID']['output'];
};

export type MinutesRange = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
};

export type Movie = {
  __typename?: 'Movie';
  averageRating: Scalars['Float']['output'];
  genres: Array<Scalars['String']['output']>;
  imdbID: Scalars['ID']['output'];
  isAdult: Scalars['Boolean']['output'];
  originalTitle: Scalars['String']['output'];
  poster?: Maybe<Scalars['String']['output']>;
  primaryTitle: Scalars['String']['output'];
  runtimeMinutes: Scalars['Int']['output'];
  startYear: Scalars['Int']['output'];
  totalVotes: Scalars['Int']['output'];
};

export type MovieFilter = {
  averageRatingRange?: InputMaybe<RatingRange>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
  releaseYearRange?: InputMaybe<YearRange>;
  runtimeMinutesRange?: InputMaybe<MinutesRange>;
  totalVotesRange?: InputMaybe<VotesRange>;
};

export type MovieStats = {
  __typename?: 'MovieStats';
  averageRatingRange: Range;
  releaseYearRange: Range;
  runtimeMinutesRange: Range;
  totalVotesRange: Range;
};

export type MoviesData = {
  __typename?: 'MoviesData';
  count: Scalars['Int']['output'];
  movies: Array<Movie>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLibrary: User;
  addMovieToFavorite: User;
  addMovieToLibrary: Library;
  createUser: User;
  deleteUser: User;
  removeLibrary: User;
  removeMovieFromFavorite: User;
  removeMovieFromLibrary: Library;
  renameLibrary: Library;
  updateUser: User;
};


export type MutationAddLibraryArgs = {
  libraryName: Scalars['String']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationAddMovieToFavoriteArgs = {
  imdbID: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationAddMovieToLibraryArgs = {
  libraryID: Scalars['ID']['input'];
  movieID: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  userID: Scalars['ID']['input'];
};


export type MutationRemoveLibraryArgs = {
  libraryID: Scalars['String']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationRemoveMovieFromFavoriteArgs = {
  imdbID: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationRemoveMovieFromLibraryArgs = {
  libraryID: Scalars['ID']['input'];
  movieID: Scalars['String']['input'];
};


export type MutationRenameLibraryArgs = {
  libraryID: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userID: Scalars['ID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  libraries: Array<Library>;
  librariesByUserID: Array<Library>;
  libraryByID: Library;
  libraryByUserAndName: Library;
  movie: Movie;
  movieInFavoriteByUserEmail: Scalars['Boolean']['output'];
  movieInFavoriteByUserID: Scalars['Boolean']['output'];
  movieStats: MovieStats;
  movies: MoviesData;
  userByEmail: User;
  userByID: User;
  users: Array<User>;
};


export type QueryLibrariesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLibrariesByUserIdArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userID: Scalars['ID']['input'];
};


export type QueryLibraryByIdArgs = {
  libraryID: Scalars['ID']['input'];
};


export type QueryLibraryByUserAndNameArgs = {
  name: Scalars['String']['input'];
  userID: Scalars['ID']['input'];
};


export type QueryMovieArgs = {
  imdbID: Scalars['ID']['input'];
};


export type QueryMovieInFavoriteByUserEmailArgs = {
  email: Scalars['String']['input'];
  imdbID: Scalars['ID']['input'];
};


export type QueryMovieInFavoriteByUserIdArgs = {
  imdbID: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
};


export type QueryMoviesArgs = {
  filter?: InputMaybe<MovieFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<SortType>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  userID: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Range = {
  __typename?: 'Range';
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
};

export type RatingRange = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export enum SortType {
  DurationHilo = 'DurationHILO',
  DurationLohi = 'DurationLOHI',
  RatingHilo = 'RatingHILO',
  RatingLohi = 'RatingLOHI',
  TitleAz = 'TitleAZ',
  TitleZa = 'TitleZA',
  YearHilo = 'YearHILO',
  YearLohi = 'YearLOHI'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  favorites: Array<Scalars['String']['output']>;
  library: Array<Library>;
  password: Scalars['String']['output'];
  userID: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type VotesRange = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
};

export type YearRange = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, favorites: Array<string>, password: string, userID: string, username: string, library: Array<{ __typename?: 'Library', libraryID: string, userID: string, name: string, movies: Array<string> }> } };

export type GetLibraryQueryVariables = Exact<{
  libraryId: Scalars['ID']['input'];
}>;


export type GetLibraryQuery = { __typename?: 'Query', libraryByID: { __typename?: 'Library', movies: Array<string>, name: string } };

export type GetUserQueryVariables = Exact<{
  imdbId: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', movie: { __typename?: 'Movie', averageRating: number, genres: Array<string>, imdbID: string, isAdult: boolean, originalTitle: string, poster?: string | null, primaryTitle: string, runtimeMinutes: number, startYear: number, totalVotes: number } };

export type GetMoviesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MovieFilter>;
  sortBy?: InputMaybe<SortType>;
}>;


export type GetMoviesQuery = { __typename?: 'Query', movies: { __typename?: 'MoviesData', count: number, movies: Array<{ __typename?: 'Movie', primaryTitle: string, totalVotes: number, imdbID: string, startYear: number, runtimeMinutes: number, poster?: string | null, originalTitle: string, isAdult: boolean, averageRating: number, genres: Array<string> }> } };

export type GetMovieStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMovieStatsQuery = { __typename?: 'Query', movieStats: { __typename?: 'MovieStats', averageRatingRange: { __typename?: 'Range', max: number, min: number }, releaseYearRange: { __typename?: 'Range', max: number, min: number }, runtimeMinutesRange: { __typename?: 'Range', max: number, min: number }, totalVotesRange: { __typename?: 'Range', max: number, min: number } } };

export type UserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserByEmailQuery = { __typename?: 'Query', userByEmail: { __typename?: 'User', userID: string, username: string, password: string, email: string, favorites: Array<string>, library: Array<{ __typename?: 'Library', libraryID: string, userID: string, name: string, movies: Array<string> }> } };

export type UserByIdQueryVariables = Exact<{
  userID: Scalars['ID']['input'];
}>;


export type UserByIdQuery = { __typename?: 'Query', userByID: { __typename?: 'User', userID: string, username: string, password: string, email: string, favorites: Array<string>, library: Array<{ __typename?: 'Library', libraryID: string, userID: string, name: string, movies: Array<string> }> } };

export type GetUserFavoritesQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserFavoritesQuery = { __typename?: 'Query', userByID: { __typename?: 'User', favorites: Array<string> } };

export type GetUsersLibrariesQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUsersLibrariesQuery = { __typename?: 'Query', librariesByUserID: Array<{ __typename?: 'Library', movies: Array<string>, name: string }> };

export type AddLibraryToUserMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  libraryName: Scalars['String']['input'];
}>;


export type AddLibraryToUserMutation = { __typename?: 'Mutation', addLibrary: { __typename?: 'User', userID: string } };

export type AddMovieToLibraryMutationVariables = Exact<{
  libraryId: Scalars['ID']['input'];
  movieId: Scalars['String']['input'];
}>;


export type AddMovieToLibraryMutation = { __typename?: 'Mutation', addMovieToLibrary: { __typename?: 'Library', libraryID: string } };

export type RemoveMovieFromLibraryMutationVariables = Exact<{
  libraryId: Scalars['ID']['input'];
  movieId: Scalars['String']['input'];
}>;


export type RemoveMovieFromLibraryMutation = { __typename?: 'Mutation', removeMovieFromLibrary: { __typename?: 'Library', libraryID: string } };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"favorites"}},{"kind":"Field","name":{"kind":"Name","value":"library"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"libraryID"}},{"kind":"Field","name":{"kind":"Name","value":"userID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"movies"}}]}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"userID"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetLibraryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLibrary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"libraryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"libraryByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"libraryID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"libraryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetLibraryQuery, GetLibraryQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imdbID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imdbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"imdbID"}},{"kind":"Field","name":{"kind":"Name","value":"isAdult"}},{"kind":"Field","name":{"kind":"Name","value":"originalTitle"}},{"kind":"Field","name":{"kind":"Name","value":"poster"}},{"kind":"Field","name":{"kind":"Name","value":"primaryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"runtimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"totalVotes"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMovies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"movies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"totalVotes"}},{"kind":"Field","name":{"kind":"Name","value":"imdbID"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"runtimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"poster"}},{"kind":"Field","name":{"kind":"Name","value":"originalTitle"}},{"kind":"Field","name":{"kind":"Name","value":"isAdult"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}}]}}]}}]}}]} as unknown as DocumentNode<GetMoviesQuery, GetMoviesQueryVariables>;
export const GetMovieStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMovieStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movieStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageRatingRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"releaseYearRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"runtimeMinutesRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalVotesRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}}]}}]} as unknown as DocumentNode<GetMovieStatsQuery, GetMovieStatsQueryVariables>;
export const UserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userID"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"library"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"libraryID"}},{"kind":"Field","name":{"kind":"Name","value":"userID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"movies"}}]}},{"kind":"Field","name":{"kind":"Name","value":"favorites"}}]}}]}}]} as unknown as DocumentNode<UserByEmailQuery, UserByEmailQueryVariables>;
export const UserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userID"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"library"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"libraryID"}},{"kind":"Field","name":{"kind":"Name","value":"userID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"movies"}}]}},{"kind":"Field","name":{"kind":"Name","value":"favorites"}}]}}]}}]} as unknown as DocumentNode<UserByIdQuery, UserByIdQueryVariables>;
export const GetUserFavoritesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFavorites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favorites"}}]}}]}}]} as unknown as DocumentNode<GetUserFavoritesQuery, GetUserFavoritesQueryVariables>;
export const GetUsersLibrariesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersLibraries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"librariesByUserID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUsersLibrariesQuery, GetUsersLibrariesQueryVariables>;
export const AddLibraryToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addLibraryToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"libraryName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLibrary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"libraryName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"libraryName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userID"}}]}}]}}]} as unknown as DocumentNode<AddLibraryToUserMutation, AddLibraryToUserMutationVariables>;
export const AddMovieToLibraryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addMovieToLibrary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"libraryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMovieToLibrary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"libraryID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"libraryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"movieID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"libraryID"}}]}}]}}]} as unknown as DocumentNode<AddMovieToLibraryMutation, AddMovieToLibraryMutationVariables>;
export const RemoveMovieFromLibraryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeMovieFromLibrary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"libraryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMovieFromLibrary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"libraryID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"libraryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"movieID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"libraryID"}}]}}]}}]} as unknown as DocumentNode<RemoveMovieFromLibraryMutation, RemoveMovieFromLibraryMutationVariables>;