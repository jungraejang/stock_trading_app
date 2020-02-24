const express = require("express");
const router = express.Router();
const {
  getMostActive,
  getCurrentPrice
} = require("../api_requests/market_requests.js");

router.get("/mostactive", getMostActive);
router.get("/currentPrice/:ticker", getCurrentPrice);

module.exports = router;
