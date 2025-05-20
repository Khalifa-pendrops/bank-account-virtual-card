//helper functions to generate accountnumber,card number, cvv and expiry date
//yes, i have decided at this point that the unique number is account number, that is accountNumber

export const generateAccountNumber = () => {
  //lets make the first 2 digits of this 10 digits account number unique
  // this line suggests that the fisrt 2 digits must be 20, 21, or 22
  const prefixDigits = ["20", "21", "22"];
  const digits = prefixDigits[Math.floor(Math.random() * prefixDigits.length)];

  //now lets get the remaining 8 digits
  let extraDigits = "";
  for (let i = 0; i < 8; i++) {
    extraDigits += Math.floor(Math.random() * 10);
  }

  return `${digits}${extraDigits}`;
};

// console.log(generateAccountNumber());

export const generateCardNumber = () => {
  let cardNumber = "";

  //creates a block of 4 digit numbers into 4 places to make 16 digits all together
  for (let i = 0; i < 4; i++) {
    cardNumber += Math.floor(1000 + Math.random() * 9000).toString();
    if (i < 3) cardNumber += " ";
  }
  return cardNumber;
};

// console.log(generateCardNumber());

export const generateCvv = () => {
  return Math.floor(100 + Math.random() * 900).toString();
};

// console.log(generateCvv());

export const generateExpiryDate = () => {
  const date = new Date();

  date.setFullYear(date.getFullYear() + 4); // expiry date set to 4 years time

  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  const year = date.getFullYear().toString().slice(-2);

  return `${month}${year}`;
};

// console.log(generateExpiryDate());
