import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90vw",
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "#e91e63",
    color: "white"
  },
  greenFont: {
    color: theme.palette.green[700],
    backgroundColor: "white"
  },
  redFont: {
    color: theme.palette.red[700],
    backgroundColor: "white"
  }
}));

const View = props => {
  const classes = useStyles();
  let {transactionsData} = props;
  console.log("transactionsData", transactionsData);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Typography variant="h5" component="p">
        Transactions
      </Typography>
      {transactionsData
        ? transactionsData.map((el, key) => {
            return (
              <Card className={classes.root} key={key}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="body2" component="h2">
                      {new Date(el.time_stamp).toString()}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around"
                      }}
                    >
                      <Typography variant="h5" component="p">
                        Ticker: {el.ticker.toUpperCase()}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Shares: {el.amount}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Price: {el.price}
                      </Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })
        : null}
    </div>
  );
};

export default View;
