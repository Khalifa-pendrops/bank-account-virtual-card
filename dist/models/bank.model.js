"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
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
exports.Account = (0, mongoose_1.model)("Account", accountSchema);
