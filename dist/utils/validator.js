"use strict";
//account number, email and card number must be unique ⚠️
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailUnique = exports.isCardNumberUnique = exports.isAccountNumberUnique = void 0;
const card_model_1 = require("../models/card.model");
const bank_model_1 = require("../models/bank.model");
//functions to check uniquenesses
const isAccountNumberUnique = async (accountNumber) => {
    const account = await bank_model_1.Account.findOne({ accountNumber });
    return !account;
};
exports.isAccountNumberUnique = isAccountNumberUnique;
const isCardNumberUnique = async (cardNumber) => {
    const card = await card_model_1.Card.findOne({ cardNumber });
    return !card;
};
exports.isCardNumberUnique = isCardNumberUnique;
const isEmailUnique = async (email) => {
    const account = await bank_model_1.Account.findOne({ email });
    return !account;
};
exports.isEmailUnique = isEmailUnique;
