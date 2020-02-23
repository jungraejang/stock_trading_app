const { db } = require("./index.js");

const purchaseStock = (req, res, next) => {
  console.log("req bodyyy", req.body);
  db.none(
    "INSERT INTO transactions (user_id, ticker, price, amount) VALUES ((SELECT id from users WHERE email=${email}), ${ticker}, ${price}, ${amount})",
    {
      email: req.body.email,
      ticker: req.body.ticker,
      price: req.body.price,
      amount: req.body.amount
    }
  ).then(() => {
    res.status(200).json({
      message: "updated successful."
    });
  });
};

const getAllTransactions = (req, res, next) => {
  console.log("req params", req.body.email);
  db.any(
    "SELECT * FROM transactions WHERE user_id=(SELECT id FROM users WHERE email=${email}) ORDER BY time_stamp DESC",
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
  getAllTransactions,
  purchaseStock
};
