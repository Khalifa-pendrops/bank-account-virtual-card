import { Card } from "../models/card.model";
import {
  generateCardNumber,
  generateCvv,
  generateExpiryDate,
} from "../utils/helper";
import { isCardNumberUnique } from "../utils/validator";
import { encryptData } from "./encrytpion.service";

//create and save card to DB
export const createVirtualCard = async (accountNumber: string) => {
  //lets generate card details
  let cardNumber!: string;
  let isUnique = false;

  while (!isUnique) {
    cardNumber = generateCardNumber();
    isUnique = await isCardNumberUnique(cardNumber);
  }

  //lets generate card number by calling the generateCarNumber function in the uitils helper.ts
  const cvv = generateCvv();
  const expiryDate = generateExpiryDate();

  //encrypt the card details here
  const encryptedCardNumber = encryptData(cardNumber);
  const encryptedCvv = encryptData(cvv);
  const encryptedExpiryDate = encryptData(expiryDate);

  //now lets create card (with details)
  const card = new Card({
    accountNumber,
    cardNumber: encryptedCardNumber.encrypted,
    cardIV: encryptedCardNumber.iv,
    cardAuthTag: encryptedCardNumber.authTag,

    cvv: encryptedCvv.encrypted,
    cvvIV: encryptedCvv.iv,
    cvvAuthTag: encryptedCvv.authTag,

    expiryDate: encryptedExpiryDate.encrypted,
    expiryDateIV: encryptedExpiryDate.iv,
    expiryDateAuthTag: encryptedExpiryDate.authTag,
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

export const getCardByAccountNumber = async (accountNumber: string) => {
  const card = Card.findOne({ accountNumber });

  return card;
};
