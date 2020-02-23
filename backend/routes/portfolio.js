const express = require("express");
const router = express.Router();
const {
  createPortfolio,
  purchaseStock
} = require("../db/portfolio_queries.js");

router.post("/create", createPortfolio);
// router.post("/purchase", purchaseStock);

module.exports = router;
