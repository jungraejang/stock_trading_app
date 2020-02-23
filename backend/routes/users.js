const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  logoutUser,
  loginUser,
  isLoggedIn,
  getBalance
} = require("../db/users_queries.js");
/* GET users listing. */
const passport = require("../auth/local.js");
const {loginRequired} = require("../auth/helpers.js");

router.get("/", getAllUsers);
router.get("/balance", getBalance);
router.post("/new", createUser);
router.post("/login", passport.authenticate("local", {}), loginUser);
router.get("/isLoggedIn", isLoggedIn);
router.post("/logout", loginRequired, logoutUser);
router.post("/balance", getBalance);
module.exports = router;
