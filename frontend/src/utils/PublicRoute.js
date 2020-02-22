import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={props =>
        Auth.isUserAuthenticated() && restricted ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};

export default PublicRoute;
