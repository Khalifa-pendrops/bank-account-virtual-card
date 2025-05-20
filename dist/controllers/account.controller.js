"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAccountsHandler = exports.createAccountHandler = void 0;
console.log('account controller file hit');
const account_service_1 = require("../services/account.service");
const card_service_1 = require("../services/card.service");
const encrytpion_service_1 = require("../services/encrytpion.service");
const createAccountHandler = async (req, res) => {
    try {
        const { firstName, surname, email, phoneNumber, dateOfBirth } = req.body;
        if (!firstName || !surname || !email || !phoneNumber || !dateOfBirth) {
            res.status(401).json({
                message: "All credentials required ❌",
            });
        }
        //create account
        const { account, encryptedData } = await (0, account_service_1.createAccount)({
            firstName,
            surname,
            email,
            phoneNumber,
            dateOfBirth,
        });
        //create the card
        const { card, decryptedCard, encryptedData: cardEncryptedData, } = await (0, card_service_1.createVirtualCard)(account.accountNumber);
        //response with both encrypted and decrypted data
        const response = {
            account: {
                ...account.toObject(),
                decryptedPhoneNumber: phoneNumber,
                decryptedDateOfBirth: dateOfBirth,
            },
            card: {
                ...card.toObject(),
                decryptedCardNumber: decryptedCard.cardNumber,
                decryptedCvv: decryptedCard.cvv,
                decryptedExpiryDate: decryptedCard.expiryDate,
            },
            encryptedData: {
                phoneNumber: encryptedData.phoneNumber,
                dateOfBirth: encryptedData.dateOfBirth,
                cardNumber: cardEncryptedData.cardNumber,
                cvv: cardEncryptedData.cvv,
                expiryDate: cardEncryptedData.expiryDate,
            },
        };
        res.status(201).json(response);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createAccountHandler = createAccountHandler;
const getAllAccountsHandler = async (req, res) => {
    try {
        const accounts = await (0, account_service_1.getAllAccounts)();
        //decrypt encrypted data for each account
        const accountWithDecryptedData = await Promise.all(accounts.map(async (account) => {
            const card = await (0, card_service_1.getCardByAccountNumber)(account.accountNumber);
            let decryptedCard = null;
            if (card) {
                decryptedCard = {
                    cardNumber: (0, encrytpion_service_1.decryptData)(card.cardNumber, card.cardIV, card.cardAuthTag),
                    cvv: (0, encrytpion_service_1.decryptData)(card.cvv, card.cvvIV, card.cvvAuthTag),
                    expiryDate: (0, encrytpion_service_1.decryptData)(card.expiryDate, card.expiryDateIV, card.expiryDateAuthTag),
                };
            }
            if (!account.phoneIV ||
                !account.phoneAuthTag ||
                !account.dateOfBirthIV ||
                !account.dateOfBirthAuthTag) {
                throw new Error("Missing decryption parameters for account data.");
            }
            return {
                ...account.toObject(),
                fullname: `${account.firstName}${account.surname}`,
                decryptedPhoneNumber: (0, encrytpion_service_1.decryptData)(account.phoneNumber, account.phoneIV, account.phoneAuthTag),
                decryptedDateOfBirth: (0, encrytpion_service_1.decryptData)(account.dateOfBirth, account.dateOfBirthIV, account.dateOfBirthAuthTag),
                card: card ? { ...card.toObject(), decryptedCard } : null,
            };
        }));
        res.status(200).json(accountWithDecryptedData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllAccountsHandler = getAllAccountsHandler;
