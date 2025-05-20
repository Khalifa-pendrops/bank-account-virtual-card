"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardByAccountNumber = exports.createVirtualCard = void 0;
const card_model_1 = require("../models/card.model");
const helper_1 = require("../utils/helper");
const validator_1 = require("../utils/validator");
const encrytpion_service_1 = require("./encrytpion.service");
//create and save card to DB
const createVirtualCard = async (accountNumber) => {
    //lets get card details
    let cardNumber;
    let isUnique = false;
    while (!isUnique) {
        cardNumber = (0, helper_1.generateCardNumber)();
        isUnique = await (0, validator_1.isCardNumberUnique)(cardNumber);
    }
    //lets generate card number by calling the generateCarNumber function in the uitils helper.ts
    const cvv = (0, helper_1.generateCvv)();
    const expiryDate = (0, helper_1.generateExpiryDate)();
    //encrypt the card details here
    const encryptedCardNumber = (0, encrytpion_service_1.encryptData)(cardNumber);
    const encryptedCvv = (0, encrytpion_service_1.encryptData)(cvv);
    const encryptedExpiryDate = (0, encrytpion_service_1.encryptData)(expiryDate);
    //now lets create card (with details)
    const card = new card_model_1.Card({
        accountNumber,
        cardNumber: {
            encrypted: encryptedCardNumber.encrypted,
            iv: encryptedCardNumber.iv,
            authTag: encryptedCardNumber.authTag,
        },
        cvv: {
            encrypted: encryptedCvv.encrypted,
            iv: encryptedCvv.iv,
            authTag: encryptedCvv.authTag,
        },
        expiryDate: {
            encrypted: encryptedExpiryDate.encrypted,
            iv: encryptedExpiryDate.iv,
            authTag: encryptedExpiryDate.authTag,
        },
    });
    await card.save();
    return {
        card,
        decryptedCard: {
            cardNumber,
            cvv,
            expiryDate,
        },
        encryptedData: {
            cardNumber: encryptedCardNumber,
            cvv: encryptedCvv,
            expiryDate: encryptedExpiryDate,
        },
    };
};
exports.createVirtualCard = createVirtualCard;
const getCardByAccountNumber = async (accountNumber) => {
    const card = card_model_1.Card.findOne({ accountNumber });
    return card;
};
exports.getCardByAccountNumber = getCardByAccountNumber;
