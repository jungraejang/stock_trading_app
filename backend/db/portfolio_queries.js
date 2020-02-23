const {db} = require("./index.js");

const createPortfolio = (req, res, next) => {
  db.none(
    "INSERT INTO portfolio (user_id, total_value) VALUES ((SELECT id FROM users WHERE email=${email}), 0)",
    {
      email: req.body.email
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

module.exports = {
  createPortfolio
};
