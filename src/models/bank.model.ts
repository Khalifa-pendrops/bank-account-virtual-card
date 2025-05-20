import { Schema, model } from "mongoose";

const accountSchema = new Schema({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  //next 4 lines for proper decrypting with aes-gcm
  phoneIV: String,
  phoneAuthTag: String,
  dateOfBirthIV: String,
  dateOfBirthAuthTag: String,
  dateOfBirth: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const Account = model("Account", accountSchema);
