const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  logoutUser,
  loginUser,
  isLoggedIn
} = require("../db/users_queries.js");
/* GET users listing. */
const passport = require("../auth/local.js");
const { loginRequired } = require("../auth/helpers.js");

router.get("/", getAllUsers);
router.post("/new", createUser);
router.post("/login", passport.authenticate("local", {}), loginUser);
router.get("/isLoggedIn", isLoggedIn);
router.post("/logout", loginRequired, logoutUser);

module.exports = router;
