import { request } from "graphql-request";
import { graphql } from "../generated";
import { LoginUser } from "../interfaces";

/**
 * GraphQL query to authenticate a user.
 */
const LOGIN_QUERY = graphql(`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      email
      password
    }
  }
`);

/**
 * Get a user by email.
 * @param {string} email
 * @returns {Promise<LoginUser>}
 */
export const getUserByEmail = async (email: string): Promise<LoginUser> => {
  const { userByEmail } = await request("http://localhost:4000/", LOGIN_QUERY, {
    email,
  });
  return userByEmail as LoginUser;
};
