import React, {useEffect, useState} from "react";
import axios from "axios";

const DashBoard = () => {
  const [marketData, setMarketData] = useState(null);
  const fetchMarketData = async () => {
    let marketData = await axios.get("/market/mostactive");
    console.log("marketDataaaaa", marketData);
    setMarketData(marketData);
  };

  useEffect(() => {
    fetchMarketData();
  }, []);
  console.log("market data state", marketData);
  return (
    <div>
      <p>Welcome to your dash board</p>
      {marketData
        ? marketData.data.map(el => {
            return (
              <div>
                <p>{el.companyName}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default DashBoard;
