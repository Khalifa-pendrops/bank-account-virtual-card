"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("route file hit!");
const express_1 = require("express");
const account_controller_1 = require("../controllers/account.controller");
const router = (0, express_1.Router)();
router.post("/create", account_controller_1.createAccountHandler);
router.get("/get-all", account_controller_1.getAllAccountsHandler);
exports.default = router;
