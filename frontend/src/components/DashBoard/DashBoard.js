import React, { useEffect, useState } from "react";
import axios from "axios";
import View from "./View.js";

const DashBoard = () => {
  const [marketData, setMarketData] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchMarketData = async () => {
      let marketData = await axios.get("/api/market/mostactive");
      setMarketData(marketData);
    };
    const fetchUserBalance = async () => {
      let email = localStorage.getItem("token");
      let balance = await axios.post("/api/users/balance", { email });
      setBalance(balance.data.data.balance);
    };
    fetchMarketData();
    fetchUserBalance();
  }, []);

  return <View balance={balance} marketData={marketData} />;
};

export default DashBoard;
