import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  }
}));

export default function StockInStockInfo(props) {
  const classes = useStyles();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [previousClose, setPreviousClose] = useState(0);

  let { ticker, sum } = props.stockInfo; // let {ticker, sum} = props.portfolio;
  console.log("propsssss", props, currentPrice);
  const priceColor = (currentPrice, previousClose) => {
    if (currentPrice < previousClose) {
      return "secondary";
    }
    return "primary";
  };

  useEffect(() => {
    const getCurrentPrice = async ticker => {
      try {
        let priceData = await axios.get(`/market/currentPrice/${ticker}`);
        setCurrentPrice(priceData.data.latestPrice);
        setPreviousClose(priceData.data.previousClose);
      } catch {
        setCurrentPrice(0);
      }
    };
    getCurrentPrice(ticker);
  }, []);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2"></Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Typography variant="body2" color="textPrimary" component="p">
              Ticker: {ticker}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              color={priceColor(currentPrice, previousClose)}
            >
              Amount: {sum} Total Assets: ${(sum * currentPrice).toFixed(2)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
