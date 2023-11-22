import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
/**
 * Generates a hashed password using the scrypt algorithm.
 *
 * @param {string} password - The plain text password to hash.
 * @returns {string} The hashed password in the format of "salt:hashedPassword".
 */
export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
};

/**
 * Verifies if an input password matches the stored password hash.
 *
 * @param {string} inputPassword - The plain text password to verify.
 * @param {string} storedPasswordHash - The stored hashed password, containing the salt and the hash, separated by a colon.
 * @returns {boolean} `true` if the input password matches the stored hash, otherwise `false`.
 */
export const verifyPassword = (
  inputPassword: string,
  storedPasswordHash: string
): boolean => {
  const [salt, key] = storedPasswordHash.split(":");
  const hashedBuffer = scryptSync(inputPassword, salt, 64);

  const keyBuffer = Buffer.from(key, "hex");

  const result = timingSafeEqual(hashedBuffer, keyBuffer);
  return result;
};
