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

// const purchaseStock = (req, res, next) => {
//   console.log("req bodyyy", req.body);
//   let ticker = req.body.ticker;
//   db.none(
//     "UPDATE portfolio SET data=$1 WHERE user_id=(SELECT id FROM users WHERE email=$2)",
//     [{[ticker]: {quantity: Number(req.body.quantity)}}, req.body.email]
//   ).then(() => {
//     res.status(200).json({
//       message: "updated successful."
//     });
//   });
// };

module.exports = {
  createPortfolio
  // purchaseStock
};
