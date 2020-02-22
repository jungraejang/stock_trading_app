const express = require("express");
const router = express.Router();
const {getMostActive} = require("../api_requests/market_requests.js");

router.get("/mostactive", getMostActive);

module.exports = router;
