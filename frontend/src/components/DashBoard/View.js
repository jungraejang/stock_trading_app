import React from "react";
import Card from "./Card/Card";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(to bottom,#0d47a1, #e91e63)",
    paddingBottom: "10px"
    // backgroundColor: theme.palette.secondary[500]
    // backgroundColor: theme.palette.secondary[500]
  },
  paper: {
    // margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  card: {
    marginTop: "40px",
    backgroundColor: "primary"
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const View = props => {
  let {balance, marketData} = props;
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <div
        style={{
          backgroundColor: "#e91e63",
          width: "90vw",
          borderRadius: "5px",
          boxShadow: "1px 1px 1px #343536",
          paddingTop: "5px",
          marginTop: "5px",
          color: "white"
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          style={{color: "white", fontWeight: "bold"}}
          component="h2"
        >
          Welcome to Your Dashboard
        </Typography>
        <Typography gutterBottom variant="h6" component="h2">
          Available Balance: ${balance}
        </Typography>
      </div>
      <CssBaseline />
      <Typography
        gutterBottom
        style={{marginTop: "10px", color: "white", fontWeight: "bold"}}
        variant="h5"
        component="h2"
      >
        Most Active Stocks of the Day
      </Typography>
      <Grid item xs={false} sm={4} md={7} className={classes.paper} />
      {marketData
        ? marketData.data.map((el, key) => {
            return (
              <Card
                symbol={el.symbol}
                companyName={el.companyName}
                openPrice={el.latestPrice}
                change={el.change}
                key={key}
                className={classes.card}
              />
            );
          })
        : null}
    </Grid>
  );
};

export default View;
