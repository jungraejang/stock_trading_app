import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
import Drawer from "@material-ui/core/Drawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
// import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
// import ReceiptIcon from "@material-ui/icons/Receipt";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  menuButton: {
    marginLeft: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appbar: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "left"
  }
}));

export default function View(props) {
  const classes = useStyles();
  let { toggleDrawer, state, logoutUser } = props;
  // const [state, setState] = React.useState({
  //   left: false
  // });

  let listItems = [
    {
      to: "/",
      primary: "Home"
    },
    {
      to: "/portfolio",
      primary: "Portfolio"
    },
    {
      to: "/transactions",
      primary: "Transactions"
    }
  ];

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {listItems.map((el, key) => {
          return (
            <ListItem button component={Link} to={el.to} key={key}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={el.primary} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListItem button key="logout" onClick={logoutUser}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
          {sideList("left")}
        </Drawer>
        <Toolbar></Toolbar>
      </AppBar>
    </div>
  );
}
