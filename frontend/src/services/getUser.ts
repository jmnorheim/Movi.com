import { request } from "graphql-request";
import { graphql } from "../generated";
import { User } from "../interfaces";

/**
 * GraphQL query to authenticate a user.
 */
const LOGIN_QUERY = graphql(`
  query UserByEmail($email: String!) {
    userByEmail(email: $email) {
      userID
      username
      password
      email
      library {
        libraryID
        userID
        name
        movies
      }
      favorites
    }
  }
`);

/**
 * Get a user by email.
 * @param {string} email
 * @returns {Promise<User>}
 */
export const getUserByEmail = async (email: string): Promise<User> => {
  const { userByEmail } = await request("http://localhost:4000/", LOGIN_QUERY, {
    email,
  });
  return userByEmail as User;
};
