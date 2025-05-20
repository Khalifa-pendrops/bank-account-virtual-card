import { Schema, model } from "mongoose";

const cardSchema = new Schema({
  accountNumber: { type: String, required: true, ref: "Account" },
  cardNumber: { type: String, required: true },
  cardIV: { type: String, required: true },
  cardAuthTag: { type: String, required: true },
  cvv: { type: String, required: true },
  cvvIV: { type: String, required: true },
  cvvAuthTag: { type: String, required: true },
  expiryDate: { type: String, required: true },
  expiryDateIV: { type: String, required: true },
  expiryDateAuthTag: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Card = model("Card", cardSchema); 
