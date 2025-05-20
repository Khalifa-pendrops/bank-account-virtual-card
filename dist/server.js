"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const account_routes_1 = __importDefault(require("./routes/account.routes"));
const encryption_routes_1 = __importDefault(require("./routes/encryption.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
(0, db_1.default)();
app.use("api/accounts", account_routes_1.default);
app.use("/api/encryption", encryption_routes_1.default);
//check app health
app.use("/health", (req, res) => {
    res.status(200).json({ status: "OK 🎉" });
});
//handle error generally
app.use((req, res) => {
    res.status(404).json({ message: "Not Found 😞" });
});
app.listen(PORT, () => {
    console.log(`This server is running on port ${PORT} 💥🚀`);
});
