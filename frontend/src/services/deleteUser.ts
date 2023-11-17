import { request } from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL } from "../interfaces";

/**
 * GraphQL query to authenticate a user.
 */
const DELETE_USER = graphql(`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userID: $userId) {
      userID
    }
  }
`);

/**
 * Delete User.
 */
export const deleteUser = async (userID: string): Promise<void> => {
  const endpoint = SERVER_URL;
  try {
    // Pass the userID as a variable to the DELETE_USER mutation
    const response = await request(endpoint, DELETE_USER, { userId: userID });
    console.log("User deleted:", response);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
