"use strict";
// import crypto from "crypto";
// import dotenv from "dotenv";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptData = exports.encryptData = void 0;
// dotenv.config();
// const algorithm = "aes-256-gcm";
// const key = crypto.scryptSync(process.env.ENCRYPTION_KEY as string, "salt", 32);
// const IV_LENGTH = 16;
// // const iv = process.env.IV;
// //encrypt data here
// export const encryptData = (data: string) => {
//   if (!data) throw new Error("Missing encryption credentials");
//   const iv = crypto.randomBytes(IV_LENGTH);
//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   let encrypted = cipher.update(data, "utf8", "hex");
//   encrypted += cipher.final("hex");
//   const authTag = cipher.getAuthTag().toString("hex");
//   return { encrypted, iv: iv.toString(), authTag }; //watch here ⚠️
// };
// export const decryptData = (
//   encryptedData: string,
//   ivHex: string,
//   // authTagHex: string
// ): string => {
//   const iv = Buffer.from(ivHex, "hex");
//   // const authTag = Buffer.from(authTagHex, "hex");
//   const decipher = crypto.createDecipheriv(
//     algorithm,
//     key,
//     iv
//     // Buffer.from(ivHex, "hex")
//   );
//   // decipher.setAuthTag(authTag);
//   let decrypted = decipher.update(encryptedData, "hex", "utf8");
//   decrypted += decipher.final("utf8");
//   return decrypted;
// };
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const algorithm = "aes-256-gcm";
const key = crypto_1.default.scryptSync(process.env.ENCRYPTION_KEY, "salt", 32);
const IV_LENGTH = 16;
// Encrypt
const encryptData = (data) => {
    if (!data)
        throw new Error("Missing encryption credentials");
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");
    const authTag = cipher.getAuthTag();
    return {
        encrypted,
        iv: iv.toString("base64"), // explicitly base64
        authTag: authTag.toString("base64"), // also base64
    };
};
exports.encryptData = encryptData;
// Decrypt
const decryptData = (encryptedData, ivBase64, authTagBase64) => {
    const iv = Buffer.from(ivBase64, "base64");
    const authTag = Buffer.from(authTagBase64, "base64");
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};
exports.decryptData = decryptData;
