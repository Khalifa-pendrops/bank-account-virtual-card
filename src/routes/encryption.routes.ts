import { Router } from "express";
import { decryptDataHandler } from "../controllers/encryption.controller";

const router = Router();

router.post("/decrypt", decryptDataHandler);

export default router;
