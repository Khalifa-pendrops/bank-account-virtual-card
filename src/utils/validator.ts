//account number, email and card number must be unique ⚠️

import { Card } from "../models/card.model";
import { Account } from "../models/bank.model";

//functions to check uniquenesses
export const isAccountNumberUnique = async (
  accountNumber: string
): Promise<boolean> => {
  const account = await Account.findOne({ accountNumber });

  return !account;
};

export const isCardNumberUnique = async (
  cardNumber: string
): Promise<boolean> => {
  const card = await Card.findOne({ cardNumber });

  return !card;
};

export const isEmailUnique = async (email: string): Promise<boolean> => {
  const account = await Account.findOne({ email });

  return !account;
};
