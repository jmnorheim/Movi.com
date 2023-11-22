import request from "graphql-request";
import { graphql } from "../../generated";
import { SERVER_URL } from "../../interfaces";

// The format for requests is as follows from the server:
const VERIFY_PASSWORD = graphql(`
  query VerifyPassword($email: String!, $password: String!) {
    verifyPassword(email: $email, password: $password)
  }
`);

/**
 * Verifies if the given password matches the one associated with the specified email in the database.
 *
 * @param {string} email - The email address of the user whose password needs to be verified.
 * @param {string} password - The password to be verified against the user's stored password.
 * @returns {Promise<boolean>} A promise that resolves to a boolean value indicating the result of the password verification.
 */
export const verifyPassword = async (
  email: string,
  password: string
): Promise<boolean> => {
  const { verifyPassword } = await request(SERVER_URL, VERIFY_PASSWORD, {
    email,
    password,
  });
  return verifyPassword;
};
