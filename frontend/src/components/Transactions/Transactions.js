import React, { useEffect, useState } from "react";
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
