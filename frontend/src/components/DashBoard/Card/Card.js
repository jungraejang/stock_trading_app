import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  }
}));

export default function ImgMediaCard(props) {
  const classes = useStyles();
  let { companyName, openPrice, change } = props;

  const priceColor = change => {
    if (change < 0) {
      return "secondary";
    }
    return "primary";
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
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
              Price: ${openPrice}
            </Typography>
            <Typography
              variant="body2"
              color={priceColor(change)}
              component="p"
            >
              Change: ${change < 0 ? Math.abs(change) : change}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
