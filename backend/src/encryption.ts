import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
};

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
