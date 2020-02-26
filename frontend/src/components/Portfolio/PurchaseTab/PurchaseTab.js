import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import StockInfo from "./StockInfo/StockInfo";
import Button from "@material-ui/core/Button";

//TODO: Migrate and separate jsx to View.js

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
    //Handles user input for ticker input and makes request to API for price info
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
        setAmount(0);
        setTicker("");
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
        style={{
          backgroundImage: "linear-gradient(to right, #e91e63, #2196f3)",
          paddingTop: "20px"
        }}
        fixed
      >
        <div
          style={{
            backgroundColor: "#f48fb1",
            borderRadius: "3px",
            marginBottom: "10px"
          }}
        >
          <Typography
            variant="h5"
            style={{
              paddingTop: "20px"
            }}
            color="textPrimary"
            component="p"
          >
            Balance: ${balance}
          </Typography>
          <Typography variant="body2" color="primary" component="p">
            {systemMessage ? systemMessage : null}
          </Typography>
          <TextField
            id="standard-basic"
            label="Ticker"
            onChange={handleChange}
            value={ticker}
          />
          <Typography variant="h6" component="p">
            {companyName}
          </Typography>
          <Typography variant="h6" component="p">
            Price: {price}{" "}
          </Typography>
          <TextField
            id="standard-basic"
            label="Amount"
            type="number"
            onChange={handleAmount}
            value={amount}
          />
          <Typography
            variant="h5"
            color="textPrimary"
            component="p"
            style={{ margin: "10px" }}
          >
            Total: {(price * amount).toFixed(2)}
          </Typography>
          <Button
            fullWidth
            type="button"
            onClick={submitOrder}
            variant="contained"
            color="secondary"
            style={{ marginBottom: "20px", width: "30vw" }}
          >
            Purchase
          </Button>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          {portfolio
            ? portfolio.map((el, key) => {
                return <StockInfo stockInfo={el} key={key} />;
              })
            : null}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default PurchaseTab;
