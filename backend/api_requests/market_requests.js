const axios = require("axios");

const getMostActive = (req, res, next) => {
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

const getCurrentPrice = (req, res, next) => {
  axios
    .get(
      `https://cloud.iexapis.com/stable/stock/${req.params.ticker}/quote?token=pk_eb600ca1661a4b9eb59fe5c52ee59504`
    )
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const getHistoricData = (req, res, next) => {
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/${req.params.ticker}/chart/1m?token=Tsk_8bc00ec876004f989543004461fe4e59`
    )
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

module.exports = {
  getMostActive,
  getCurrentPrice,
  getHistoricData
};
