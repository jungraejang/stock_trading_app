import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "70vw",
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "white"
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

const DashBoardCard = props => {
  const classes = useStyles();
  let { companyName, openPrice, change } = props;

  const priceColor = change => {
    if (change < 0) {
      return false;
    }
    return true;
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" style={{ color: "#0d47a1" }}>
            {companyName}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Typography variant="body2" color="textPrimary" component="p">
              Price: ${openPrice ? Number(openPrice).toFixed(2) : null}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className={
                priceColor(change) ? classes.greenFont : classes.redFont
              }
            >
              {priceColor(change) ? "↑" : "↓"} Change: $
              {change < 0 ? Math.abs(change).toFixed(2) : change.toFixed(2)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DashBoardCard;
