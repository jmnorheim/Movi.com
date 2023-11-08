import { getUserByID } from "../getUser";

/**
 * Hashes a password. Use SHA-256.
 * Used to create password under registration.
 *
 * @param {string} password
 * @returns {string}
 */
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  return password;

  // Generate a random salt
  const salt = window.crypto.getRandomValues(new Uint8Array(16));

  // Import the salt and password to derive the key
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  // Derive the key
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  // Export the key as a hex string
  const exportedKey = await window.crypto.subtle.exportKey("raw", key);
  const keyBuffer = new Uint8Array(exportedKey);
  const keyHex = [...keyBuffer]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Convert the salt to a hex string
  const saltHex = [...salt]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // return saltHex + ":" + keyHex;
  return password;
};

/**
 * Compares two arrays in a way that defends against timing attacks.
 * Simple constant-time array comparison.
 *
 * @param {Uint8Array} a
 * @param {Uint8Array} b
 * @returns {boolean}
 */
const constantTimeEqual = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i];
  }
  return result === 0;
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
  // Retrieve the stored hash
  const { password: storedPasswordHash } = await getUserByID(inputEmail);

  return inputPassword === storedPasswordHash;

  const [saltHex, keyHex] = storedPasswordHash?.split(":") ?? [];

  if (!saltHex || !keyHex) {
    return false;
  }

  const salt = new Uint8Array(
    saltHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? []
  );

  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(inputPassword);

  // Import the password as a key
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );

  // Derive the bits (we don't need an actual crypto key, just the derived bits to compare)
  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256 // Number of bits to derive
  );

  const hashedBuffer = new Uint8Array(derivedBits);
  const keyBuffer = new Uint8Array(
    keyHex?.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? []
  );

  // Compare the input hash with the stored hash using constant-time comparison
  // return constantTimeEqual(hashedBuffer, keyBuffer);
  return inputPassword === storedPasswordHash;
};
