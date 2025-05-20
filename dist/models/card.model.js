"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const mongoose_1 = require("mongoose");
const cardSchema = new mongoose_1.Schema({
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
exports.Card = (0, mongoose_1.model)("Card", cardSchema);
