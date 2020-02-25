import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card/Card";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const DashBoard = () => {
  const classes = useStyles();

  const [marketData, setMarketData] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchMarketData = async () => {
      let marketData = await axios.get("/market/mostactive");
      setMarketData(marketData);
    };
    const fetchUserBalance = async () => {
      let email = localStorage.getItem("token");
      let balance = await axios.post("/users/balance", { email });
      setBalance(balance.data.data.balance);
    };
    fetchMarketData();
    fetchUserBalance();
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <p>Welcome to your dash board</p>
      <p>Available Balance: ${balance}</p>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {marketData
          ? marketData.data.map((el, key) => {
              return (
                <Card
                  symbol={el.symbol}
                  companyName={el.companyName}
                  openPrice={el.latestPrice}
                  change={el.change}
                  key={key}
                />
              );
            })
          : null}
      </Grid>
    </Grid>
  );
};

export default DashBoard;
