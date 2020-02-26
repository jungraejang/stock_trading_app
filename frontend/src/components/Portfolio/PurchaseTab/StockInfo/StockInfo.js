import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    flex: "display",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f8bbd0",
    marginTop: "10px"
  },
  greenFont: {
    color: theme.palette.green[700]
  },
  redFont: {
    color: theme.palette.red[700]
  }
}));

export default function StockInStockInfo(props) {
  const classes = useStyles();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [previousClose, setPreviousClose] = useState(0);
  const [companyName, setCompanyName] = useState("");

  let { ticker, sum } = props.stockInfo; // let {ticker, sum} = props.portfolio;
  const priceColor = (currentPrice, previousClose) => {
    if (currentPrice < previousClose) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const getCurrentPrice = async ticker => {
      try {
        let priceData = await axios.get(`/market/currentPrice/${ticker}`);
        setCurrentPrice(priceData.data.latestPrice);
        setPreviousClose(priceData.data.previousClose);
        setCompanyName(priceData.data.companyName);
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
          <Typography gutterBottom variant="h6" component="h2">
            {companyName}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly"
            }}
          >
            <Typography variant="body2" color="textPrimary" component="p">
              Ticker: {ticker.toUpperCase()}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className={
                priceColor(currentPrice, previousClose)
                  ? classes.greenFont
                  : classes.redFont
              }
            >
              {priceColor(currentPrice, previousClose) ? "⇑" : "⇓"} Assets: $
              {(sum * currentPrice).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              Shares: {sum}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
