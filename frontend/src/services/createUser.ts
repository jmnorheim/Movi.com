import { request } from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL, User } from "../interfaces";

/**
 * GraphQL query to create a user.
 */
const CREATE_USER = graphql(`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      email
      favorites
      library {
        libraryID
        userID
        name
        movies
      }
      password
      userID
      username
    }
  }
`);

/**
 * Creates a new user account and adds it to the database.
 *
 * This function sends a GraphQL mutation to create a new user with a specified username, email, and password.
 * The password is hashed at the backend for security. The function returns the newly created user data.
 *
 * @param {string} username - The desired username for the new user.
 * @param {string} email - The email address associated with the new user account.
 * @param {string} password - The password for the new user account. It will be hashed in the backend.
 * @returns {Promise<User>} A promise that resolves to an object containing the newly created user's information.
 *
 * @throws {Error} Throws an error if the GraphQL request fails or if there's an issue with user creation on the server.
 */
export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  // Password is Hashed in backend

  const variables = {
    username,
    email,
    password,
  };
  const { createUser } = await request(SERVER_URL, CREATE_USER, variables);
  return createUser;
};
