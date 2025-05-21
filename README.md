# Bank Account API with Virtual Cards

This is a secure Node.js + TypeScript API for creating bank accounts with automatically generated virtual cards, featuring encryption for sensitive data.

---

## Features

- _Account Creation_ with:
  - First name, surname, email, phone number, date of birth
  - Auto-generated 10-digit account number
  - Account number is unique in that it must start with either 20, 21 or 22 as first 2 digits
- _Virtual Card Generation_:
  - 16-digit card number (spaced every 4 digits)
  - 3-digit CVV
  - Expiry date 4 years from date of creation (MM/YY format)
- _Data Security_:
  - AES-256-GCM encryption for sensitive fields
  - Environment variables for configuration
- _API Endpoints_:
  - Create accounts with auto-generated virtual cards
  - List all accounts with decrypted data
  - Decrypt encrypted data

---

## Technologies Used

- _Backend_: Node.js, Express, TypeScript
- _Database_: MongoDB
- _Encryption_: Node.js crypto module
- _Validation_: Built-in and custom validators
- _Documentation_: Postman

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud instance)
- Postman (for API testing)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Khalifa-pendrops/bank-account-virtual-card.git
   cd bank-account-api

   ```

2. Install Dependencies

   ```bash
   npm install

   ```

3. Create .env file

   ```env
   MONGO_URI=enter-your-string-here
   ENCRYPTION_KEY=enter-your-encryption-key-here
   PORT=enter-your-PORT-here

   ```

4. Start the Server

   ```bash
   npm run dev

   ```

---

### Data flow

- Client sends account creation request
- Server:
   - Validates input
   - Generates account number
   - Creates virtual card
   - Encrypts sensitive data
   - Stores in database
- Returns:
   - Account details
   - Virtual card details
   - Both encrypted and decrypted versions

---

### Security
- Encrypted Fields:
- Card number
- CVV
- Expiry date
- Phone number
- Date of birth
- Environment Variables for secrets
- No hardcoded sensitive information

---

### Testing

The API is documented and available on Postman.
- Online docs: 🌐 [Click here to view the API docs](https://documenter.getpostman.com/view/39824274/2sB2qZF37a)
- Download and import: You can also import the API collection into Postman manually using the [`postman_collection.json`](./docs/postman_collection.json)

---

