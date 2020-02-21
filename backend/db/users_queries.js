const { db } = require("./index.js");

const authHelpers = require("../auth/helpers.js");

const getAllUsers = (req, res, next) => {
  db.any("SELECT * FROM users")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Got all users!",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password);
  db.none(
    "INSERT INTO users (name, email, password_digest) VALUES (${name}, ${email}, ${password})",
    {
      name: req.body.name,
      email: req.body.email,
      password: hash
    }
  )
    .then(() => {
      res.status(200).json({
        message: "Registration successful."
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};

const logoutUser = (req, res, next) => {
  console.log("logout triggered");
  req.logout();
  res.status(200).send("log out success");
};

const loginUser = (req, res) => {
  console.log("login user", req.user);
  res.json(req.user);
};

const isLoggedIn = (req, res) => {
  console.log(req.user);
  if (req.user) {
    console.log("isLoggedIn:", req.user);
    res.json({ username: req.user });
  } else {
    console.log("isLoggedIn: null");
    res.json({ username: null });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  logoutUser,
  loginUser,
  isLoggedIn
};
