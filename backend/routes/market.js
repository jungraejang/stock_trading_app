const express = require("express");
const router = express.Router();
const {
  getMostActive,
  getCurrentPrice,
  getHistoricData
} = require("../api_requests/market_requests.js");

router.get("/mostactive", getMostActive);
router.get("/currentPrice/:ticker", getCurrentPrice);
router.get("/getHistoricData/:ticker", getHistoricData);

module.exports = router;
