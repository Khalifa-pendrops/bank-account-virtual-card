import { Router } from "express";
import {
  createAccountHandler,
  getAllAccountsHandler,
} from "../controllers/account.controller";

const router = Router();

router.post("/create", createAccountHandler);
router.get("/get-all", getAllAccountsHandler);

export default router;
