import { Request, Response } from "express";
import { createAccount, getAllAccounts } from "../services/account.service";
import {
  // createVirtualCard,
  getCardByAccountNumber,
} from "../services/card.service";
import { decryptData } from "../services/encrytpion.service";

export const createAccountHandler = async (req: Request, res: Response) => {
  try {
    const { firstName, surname, email, phoneNumber, dateOfBirth } = req.body;

    if (!firstName || !surname || !email || !phoneNumber || !dateOfBirth) {
      res.status(401).json({
        message: "All credentials required ❌",
      });
    }

    //create account
    const { account, card, decryptedCard, encryptedData } = await createAccount(
      {
        firstName,
        surname,
        email,
        phoneNumber,
        dateOfBirth,
      }
    );

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
      encryptedData,
    };

    res.status(201).json({ status: "Success 🎉", response });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllAccountsHandler = async (req: Request, res: Response) => {
  try {
    const accounts = await getAllAccounts();

    //decrypt encrypted data for each account
    const accountWithDecryptedData = await Promise.all(
      accounts.map(async (account) => {
        const card = await getCardByAccountNumber(account.accountNumber);

        let decryptedCard = null;

        if (card) {
          decryptedCard = {
            cardNumber: decryptData(
              card.cardNumber,
              card.cardIV,
              card.cardAuthTag
            ),
            cvv: decryptData(card.cvv, card.cvvIV, card.cvvAuthTag),
            expiryDate: decryptData(
              card.expiryDate,
              card.expiryDateIV,
              card.expiryDateAuthTag
            ),
          };
        }

        if (
          !account.phoneIV ||
          !account.phoneAuthTag ||
          !account.dateOfBirthIV ||
          !account.dateOfBirthAuthTag
        ) {
          throw new Error("Missing decryption parameters for account data. 😞");
        }

        return {
          ...account.toObject(),
          fullname: `${account.firstName}${account.surname}`,
          decryptedPhoneNumber: decryptData(
            account.phoneNumber,
            account.phoneIV,
            account.phoneAuthTag
          ),
          decryptedDateOfBirth: decryptData(
            account.dateOfBirth,
            account.dateOfBirthIV,
            account.dateOfBirthAuthTag
          ),
          card: card ? { ...card.toObject(), decryptedCard } : null,
        };
      })
    );

    res.status(200).json({ status: "Success 🎉", accountWithDecryptedData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
