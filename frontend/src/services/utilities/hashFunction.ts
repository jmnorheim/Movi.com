import sha256 from "crypto-js/sha256";
import { getUserByID } from "../getUser";

/**
 * Hashes a password. Use SHA-256.
 * Used to create password under registration.
 *
 * @param {string} password
 * @returns {string}
 */
export const hashPassword = (password: string): string => {
  return sha256(password).toString();
};

/**
 * Verifies that input password is equal to stored hash.
 * Used at LoginPage.
 *
 * @async
 * @param {string} inputEmail
 * @param {string} inputPassword
 * @returns {Promise<boolean>}
 */
export const verifyPassword = async (
  inputEmail: string,
  inputPassword: string
): Promise<boolean> => {
  // Hash the input password
  const inputPasswordHash = hashPassword(inputPassword);

  // Retrieve the stored hash
  const { password: storedPasswordHash } = await getUserByID(inputEmail);

  // Compare the input hash with the stored hash
  return inputPasswordHash === storedPasswordHash;
};
