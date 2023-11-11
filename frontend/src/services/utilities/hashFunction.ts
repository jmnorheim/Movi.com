import request from "graphql-request";
import { graphql } from "../../generated";
import { SERVER_URL } from "../../interfaces";

const VERIFY_PASSWORD = graphql(`
  query VerifyPassword($email: String!, $password: String!) {
    verifyPassword(email: $email, password: $password)
  }
`);

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
