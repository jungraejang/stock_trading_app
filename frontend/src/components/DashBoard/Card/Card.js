import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

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
          <Typography variant="body2" color="textPrimary" component="p">
            Price: ${openPrice}
          </Typography>
          <Typography variant="body2" color={priceColor(change)} component="p">
            Change: ${change < 0 ? Math.abs(change) : change}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
