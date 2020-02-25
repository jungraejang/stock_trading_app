import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import StockInfo from "./StockInfo/StockInfo";

const PurchaseTab = () => {
  const [ticker, setTicker] = useState("");
  const [price, setPriceData] = useState(0);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [portfolio, setPortfolio] = useState(null);
  const [systemMessage, setSystemMessage] = useState(null);
  const [companyName, setCompanyName] = useState(null);

  useEffect(() => {
    console.log("use effect triggered");
    fetchUserBalance();
    fetchPortfolio();
  }, []);

  const fetchUserBalance = async () => {
    let email = localStorage.getItem("token");
    let balance = await axios.post("/users/balance", { email });
    setBalance(balance.data.data.balance);
  };

  const fetchPortfolio = async () => {
    let email = localStorage.getItem("token");
    let portfolio = await axios.post("/portfolio/getPortfolio", {
      email
    });
    setPortfolio(portfolio.data.data);
  };

  const handleAmount = async event => {
    setSystemMessage(null);
    setAmount(event.target.value);
  };

  const handleChange = async event => {
    // console.log(event.target.value);
    setTicker(event.target.value);
    setSystemMessage(null);
    setCompanyName(null);
    try {
      let priceData = await axios.get(
        `/market/currentPrice/${event.target.value}`
      );
      setPriceData(priceData.data.latestPrice);
      setCompanyName(priceData.data.companyName);
    } catch {
      setPriceData(0);
      setSystemMessage("No stock found under the ticker");
    }
  };

  const submitOrder = async () => {
    let email = localStorage.getItem("token");
    let purchaseTotal = Number(amount) * Number(price);
    if (purchaseTotal < balance) {
      try {
        await axios.post("/transactions/purchase", {
          amount,
          email,
          ticker,
          price
        });
        await axios.post("/users/updateUserBalance", {
          email,
          purchaseTotal
        });
        fetchPortfolio();
        fetchUserBalance();
      } catch {
        console.log("purchase failed");
      }
    } else {
      setSystemMessage(
        "Insufficient Fund. Please lower your amount or add fund to your account"
      );
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
        <p>{systemMessage ? systemMessage : null}</p>
        <TextField id="standard-basic" label="Ticker" onChange={handleChange} />
        <p>
          Company Name: {companyName} Price: {price}
        </p>
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
              return <StockInfo stockInfo={el} key={key} />;
            })
          : null}
      </Container>
    </React.Fragment>
  );
};

export default PurchaseTab;
