"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptDataHandler = void 0;
const encrytpion_service_1 = require("../services/encrytpion.service");
const decryptDataHandler = async (req, res) => {
    try {
        const { encryptedData, iv, authTag } = req.body;
        if (!encryptedData || !iv || !authTag) {
            res
                .status(400)
                .json({ message: "Encryption credentials are required ❌" });
            return;
        }
        const decrypted = (0, encrytpion_service_1.decryptData)(encryptedData, iv, authTag);
        res.status(200).json(decrypted);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.decryptDataHandler = decryptDataHandler;
