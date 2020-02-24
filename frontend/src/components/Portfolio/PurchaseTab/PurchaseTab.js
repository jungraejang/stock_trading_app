import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const PurchaseTab = () => {
  const [ticker, setTicker] = useState("");
  const [price, setPriceData] = useState(0);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchUserBalance = async () => {
      let email = localStorage.getItem("token");
      let balance = await axios.post("/users/balance", { email });
      setBalance(balance.data.data.balance);
    };

    fetchUserBalance();
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    let email = localStorage.getItem("token");
    let portfolio = await axios.post("/portfolio/getPortfolio", {
      email
    });
    setPortfolio(portfolio.data.data);
  };

  const handleAmount = async event => {
    setAmount(event.target.value);
  };

  const handleChange = async event => {
    // console.log(event.target.value);
    setTicker(event.target.value);
    try {
      let priceData = await axios.get(
        `/market/currentPrice/${event.target.value}`
      );
      setPriceData(priceData.data.latestPrice);
    } catch {
      setPriceData(0);
    }
  };

  const submitOrder = async () => {
    let email = localStorage.getItem("token");
    try {
      await axios.post("/transactions/purchase", {
        amount,
        email,
        ticker,
        price
      });
      fetchPortfolio();
    } catch {
      console.log("purchase failed");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        fixed
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
      >
        <p>Balance: {balance}</p>

        <TextField id="standard-basic" label="Ticker" onChange={handleChange} />
        <p>Price: {price}</p>
        <TextField
          id="standard-basic"
          label="Amount"
          type="number"
          onChange={handleAmount}
        />
        <p>Total: {price * amount}</p>
        <button type="button" onClick={submitOrder}>
          Purchase
        </button>
        {portfolio
          ? portfolio.map((el, key) => {
              return (
                <>
                  <p key={key}>{el.ticker}</p>
                  <p key={key + 1}>{el.sum}</p>
                </>
              );
            })
          : null}
      </Container>
    </React.Fragment>
  );
};

export default PurchaseTab;
