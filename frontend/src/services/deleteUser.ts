import { request } from "graphql-request";
import { graphql } from "../generated";
import { SERVER_URL } from "../interfaces";

/**
 * GraphQL query to delete a user.
 */
const DELETE_USER = graphql(`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userID: $userId) {
      userID
    }
  }
`);

/**
 * Deletes an existing user account from the database.
 *
 * This function sends a GraphQL mutation request to delete a user specified by their user ID. It ensures the user is removed from the system, handling any necessary clean-up or database updates.
 *
 * @param {string} userID - The unique identifier of the user to be deleted.
 * @returns {Promise<void>} A promise that resolves once the user has been successfully deleted.
 *
 * @throws {Error} Throws an error if the GraphQL request fails, or if the server encounters an issue during the process of deleting the user.
 */
export const deleteUser = async (userID: string): Promise<void> => {
  try {
    // Pass the userID as a variable to the DELETE_USER mutation
    await request(SERVER_URL, DELETE_USER, { userId: userID });
  } catch (error) {
    throw Error("Error deleting user:");
  }
};
