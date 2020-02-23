const axios = require("axios");

const getMostActive = (req, res, next) => {
  console.log("triggered most active");
  axios
    .get(
      "https://sandbox.iexapis.com/stable/stock/market/list/mostactive?token=Tsk_8bc00ec876004f989543004461fe4e59"
    )
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
  // res.status(200).json({ message: "triggered most active" });
};

module.exports = {
  getMostActive
};
