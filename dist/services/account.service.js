"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAccounts = exports.createAccount = void 0;
console.log("account service file hit");
const bank_model_1 = require("../models/bank.model");
const helper_1 = require("../utils/helper");
const validator_1 = require("../utils/validator");
const encrytpion_service_1 = require("./encrytpion.service");
//create and save account to DB
const createAccount = async (data) => {
    //check if email is a unique email or already exists
    if (!(await (0, validator_1.isEmailUnique)(data.email))) {
        throw new Error("Email already exists 🚫");
    }
    //if email is unique, proceed to create unique account number by calling the generate account function in the utils helper.ts
    let accountNumber;
    let isUnique = false;
    while (!isUnique) {
        accountNumber = (0, helper_1.generateAccountNumber)();
        isUnique = await (0, validator_1.isAccountNumberUnique)(accountNumber);
    }
    //first encrypt data in the account details
    const encryptedPhone = (0, encrytpion_service_1.encryptData)(data.phoneNumber);
    const encryptedDateOfBirth = (0, encrytpion_service_1.encryptData)(data.dateOfBirth);
    //now create account (whole account details)
    const account = new bank_model_1.Account({
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
    return {
        account,
        //as zubairu requires, encrypted data to be returned
        encryptedData: {
            phoneNumber: encryptedPhone,
            dateOfBirth: encryptedDateOfBirth,
        },
    };
};
exports.createAccount = createAccount;
//retrieve all created accounts from DB
const getAllAccounts = async () => {
    const accounts = await bank_model_1.Account.find().sort({ createdAt: -1 });
    return accounts;
};
exports.getAllAccounts = getAllAccounts;
