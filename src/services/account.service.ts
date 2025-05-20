import { Account } from "../models/bank.model";
import { generateAccountNumber } from "../utils/helper";
import { isAccountNumberUnique, isEmailUnique } from "../utils/validator";
import { encryptData } from "./encrytpion.service";
import { createVirtualCard } from "./card.service";

export interface CreateAccountInput {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

//create and save account to DB
export const createAccount = async (data: CreateAccountInput) => {
  //check if email is a unique email or already exists
  if (!(await isEmailUnique(data.email))) {
    throw new Error("Email already exists 🚫");
  }

  //if email is unique, proceed to create unique account number by calling the generate account function in the utils helper.ts
  let accountNumber!: string;
  let isUnique = false;

  while (!isUnique) {
    accountNumber = generateAccountNumber();
    isUnique = await isAccountNumberUnique(accountNumber);
  }

  //first encrypt data in the account details
  const encryptedPhone = encryptData(data.phoneNumber);
  const encryptedDateOfBirth = encryptData(data.dateOfBirth);

  //now create account (whole account details)
  const account = new Account({
    ...data,
    phoneNumber: encryptedPhone.encrypted,
    phoneIV: encryptedPhone.iv,
    phoneAuthTag: encryptedPhone.authTag,
    dateOfBirth: encryptedDateOfBirth.encrypted,
    dateOfBirthIV: encryptedDateOfBirth.iv,
    dateOfBirthAuthTag: encryptedDateOfBirth.authTag,
    accountNumber,
  });

  await account.save();

  const {
    card,
    decryptedCard,
    encryptedData: cardEncryptedData,
  } = await createVirtualCard(accountNumber);

  return {
    account,
    card,
    decryptedCard,
    //as zubairu requires, encrypted data to be returned
    encryptedData: {
      phoneNumber: encryptedPhone,
      dateOfBirth: encryptedDateOfBirth,
      cardNumber: cardEncryptedData.cardNumber,
      cvv: cardEncryptedData.cvv,
      expiryDate: cardEncryptedData.expiryDate,
    },
  };
};

//retrieve all created accounts from DB
export const getAllAccounts = async () => {
  const accounts = await Account.find().sort({ createdAt: -1 });

  return accounts;
};
