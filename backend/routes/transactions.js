const express = require("express");
const router = express.Router();
const {
  purchaseStock,
  getAllTransactions
} = require("../db/transactions_queries.js");

router.post("/getAllTransactions", getAllTransactions);
router.post("/purchase", purchaseStock);

module.exports = router;
