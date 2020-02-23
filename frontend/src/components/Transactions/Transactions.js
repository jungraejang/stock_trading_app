import React, {useEffect, useState} from "react";
import axios from "axios";
const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      let email = localStorage.getItem("token");
      let transactionsData = await axios.post(
        "/transactions/getAllTransactions",
        {email}
      );
      setTransactionsData(transactionsData.data.data);
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <p>Welcome to your transactions</p>
      {transactionsData
        ? transactionsData.map((el, key) => {
            return (
              <div>
                <p>{el.ticker}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Transactions;
