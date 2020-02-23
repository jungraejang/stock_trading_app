const express = require("express");
const router = express.Router();
const {createPortfolio} = require("../db/portfolio_queries.js");

router.post("/create", createPortfolio);

module.exports = router;
