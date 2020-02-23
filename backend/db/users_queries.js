const {db} = require("./index.js");

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
    "INSERT INTO users (name, email, password_digest, balance) VALUES (${name}, ${email}, ${password}, ${balance})",
    {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      balance: Number(req.body.amount)
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
  req.logout();
  res.status(200).send("log out success");
};

const loginUser = (req, res) => {
  res.json(req.user);
};

const isLoggedIn = (req, res) => {
  if (req.user) {
    res.json({email: req.user});
  } else {
    res.json({email: null});
  }
};

const getBalance = (req, res) => {
  db.any("SELECT balance FROM users WHERE email = ${email}", {
    email: req.body.email
  })
    .then(data => {
      console.log("Dataaaa", data[0]);
      res.status(200).json({
        status: "success",
        message: "Got all users!",
        data: data[0]
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllUsers,
  createUser,
  logoutUser,
  loginUser,
  isLoggedIn,
  getBalance
};
