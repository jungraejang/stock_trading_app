const { db } = require("./index.js");

//TODO: Potentially implement query where user stocks are saved as object inside portfolio table

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

const getPortfolio = (req, res, next) => {
  db.any(
    "SELECT ticker, sum(amount) FROM transactions WHERE user_id=(SELECT id FROM users WHERE email=${email}) GROUP BY ticker",
    { email: req.body.email }
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "transactions received successfully",
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};

module.exports = {
  createPortfolio,
  getPortfolio
};
