import React from "react";
import View from "./View.js";

export default function Navbar(props) {
  const [state, setState] = React.useState({
    left: false
  });

  let { logoutUser } = props;

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, left: open });
  };

  return (
    <View toggleDrawer={toggleDrawer} state={state} logoutUser={logoutUser} />
  );
}
