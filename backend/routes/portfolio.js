const express = require("express");
const router = express.Router();
const {createPortfolio, getPortfolio} = require("../db/portfolio_queries.js");

router.post("/create", createPortfolio);
router.post("/getPortfolio", getPortfolio);

module.exports = router;
