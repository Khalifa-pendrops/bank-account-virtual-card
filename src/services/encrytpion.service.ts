import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.ENCRYPTION_KEY as string, "base64");
if (!key) {
  throw new Error("An encryption key is missing");
}


const IV_LENGTH = 16;

// Encrypt data here
export const encryptData = (data: string) => {
  if (!data) throw new Error("Missing encryption credentials 😞");

  const iv = crypto.randomBytes(IV_LENGTH); //initialization vector of defined length
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  //encrytpion happenes here
  let encrypted = cipher.update(data, "utf8", "base64");
  encrypted += cipher.final("base64");

  //attached authentication tag to cipher
  //required for decryption
  const authTag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
  };
};

// Decrypt data here
export const decryptData = (
  encryptedData: string,
  ivBase64: string,
  authTagBase64: string
): string => {
  const iv = Buffer.from(ivBase64, "base64");
  const authTag = Buffer.from(authTagBase64, "base64");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag);

  //decryption happens here
  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
