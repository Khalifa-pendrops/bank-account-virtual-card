import { Request, Response } from "express";
import { decryptData } from "../services/encrytpion.service";

export const decryptDataHandler = async (req: Request, res: Response) => {
  try {
    const { encryptedData, iv, authTag } = req.body;

    if (!encryptedData || !iv || !authTag) {
      res
        .status(400)
        .json({ message: "Encryption credentials are required ❌" });
      return;
    }

    const decrypted = decryptData(encryptedData, iv, authTag);

    res.status(200).json(decrypted);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
