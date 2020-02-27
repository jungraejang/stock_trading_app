import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import StockInfo from "./StockInfo/StockInfo";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import StockChart from "./StockChart/StockChart.js";

//TODO: Migrate and separate jsx to View.js

const PurchaseTab = () => {
  const [ticker, setTicker] = useState("");
  const [price, setPriceData] = useState(0);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [systemMessage, setSystemMessage] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [modalTicker, setModalTicker] = React.useState(null);

  useEffect(() => {
    fetchUserBalance();
    fetchPortfolio();
  }, []);

  const handleOpen = ticker => {
    setModalTicker(ticker);
    setOpen(true);
  };

  const handleClose = () => {
    setModalTicker(null);
    setOpen(false);
  };

  const fetchUserBalance = async () => {
    let email = localStorage.getItem("token");
    let balance = await axios.post("/api/users/balance", { email });
    setBalance(balance.data.data.balance);
  };

  const fetchPortfolio = async () => {
    let email = localStorage.getItem("token");
    let portfolio = await axios.post("/api/portfolio/getPortfolio", {
      email
    });
    setPortfolio(portfolio.data.data);
    // if (portfolio.length) {
    //   setPortfolio(portfolio.data.data);
    // }
  };

  const handleAmount = async event => {
    setSystemMessage(null);
    setAmount(event.target.value);
  };

  const handleChange = async event => {
    //Handles user input for ticker input and makes request to API for price info
    setTicker(event.target.value);
    setCompanyName(null);
    try {
      let priceData = await axios.get(
        `/api/market/currentPrice/${event.target.value}`
      );
      setPriceData(priceData.data.latestPrice);
      setCompanyName(priceData.data.companyName);
      setSystemMessage(null);
    } catch {
      setPriceData(0);
      setSystemMessage("No stock found under the ticker");
    }
  };

  const submitOrder = async () => {
    let email = localStorage.getItem("token");
    let purchaseTotal = Number(amount) * Number(price);
    if (purchaseTotal < balance) {
      setPortfolio([]);
      try {
        await axios.post("/api/transactions/purchase", {
          amount,
          email,
          ticker,
          price
        });
        await axios.post("/api/users/updateUserBalance", {
          email,
          purchaseTotal
        });
        await fetchPortfolio();
        await fetchUserBalance();
        setAmount(0);
        setTicker("");
        setCompanyName(null);
      } catch {
        console.log("purchase failed");
      }
    } else {
      setSystemMessage(
        "Insufficient Fund. Please lower your amount or add fund to your account"
      );
    }
  };
  console.log("portfolio", portfolio);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        style={{
          backgroundImage: "linear-gradient(to bottom, #e91e63, #0d47a1)",
          paddingTop: "20px",
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
        fixed
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "3px",
            marginBottom: "10px",
            width: "90vw"
          }}
        >
          <Typography
            variant="h5"
            style={{
              paddingTop: "20px",
              color: "#0d47a1"
            }}
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
          <Typography
            variant="h6"
            style={{
              color: "#0d47a1"
            }}
            component="p"
          >
            Price: {price}{" "}
          </Typography>
          <TextField
            id="standard-basic"
            label="Amount"
            type="number"
            onChange={handleAmount}
            value={amount}
            style={{ color: "white" }}
          />
          <Typography
            variant="h5"
            component="p"
            style={{ margin: "10px", color: "#0d47a1" }}
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
        <div style={{ paddingBottom: "20px", height: "auto" }}>
          {portfolio.length ? (
            portfolio.map((el, key) => {
              return (
                <StockInfo
                  stockInfo={el}
                  key={key}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                />
              );
            })
          ) : (
            <Typography
              variant="h5"
              style={{
                color: "white"
              }}
            >
              Your Portfolio Is Currently Empty
            </Typography>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                width: "90vw"
              }}
            >
              <StockChart modalTicker={modalTicker} />
            </div>
          </Modal>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default PurchaseTab;
