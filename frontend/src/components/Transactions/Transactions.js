import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import green from "@material-ui/core/colors/green";

import axios from "axios";
import View from "./View.js";

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState(null);

  const fetchTransactions = async () => {
    let email = localStorage.getItem("token");
    let transactionsData = await axios.post(
      "/transactions/getAllTransactions",
      { email }
    );
    setTransactionsData(transactionsData.data.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return <View transactionsData={transactionsData} />;
};

export default Transactions;
