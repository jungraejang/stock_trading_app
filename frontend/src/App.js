import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import "./App.css";
import Auth from "./utils/Auth";
import axios from "axios";
import Login from "./components/UserAuth/Login/Login.js";
import Register from "./components/UserAuth/Register/Register.js";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import DashBoard from "./components/DashBoard/DashBoard.js";
import NavBar from "./components/NavBar/NavBar.js";
import Portfolio from "./components/Portfolio/Portfolio.js";
import Transactions from "./components/Transactions/Transactions.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.checkAuthenticateStatus();
  }

  checkAuthenticateStatus = () => {
    axios.get("/api/users/isLoggedIn").then(user => {
      if (user.data.email === Auth.getToken()) {
        this.setState({
          isLoggedIn: Auth.isUserAuthenticated(),
          email: Auth.getToken()
        });
      } else {
        user.data.email ? this.logoutUser() : Auth.deauthenticateUser();
      }
    });
  };

  logoutUser = () => {
    axios
      .post("/api/users/logout")
      .then(() => {
        Auth.deauthenticateUser();
      })
      .then(() => {
        this.checkAuthenticateStatus();
        this.props.history.push("/login");
        this.setState({
          isLoggedIn: false
        });
      });
  };

  render() {
    const { isLoggedIn } = this.state;
    const { checkAuthenticateStatus, logoutUser } = this;
    return (
      <div className="App">
        <div>{isLoggedIn ? <NavBar logoutUser={logoutUser} /> : null}</div>
        <div>
          <Switch>
            <PublicRoute
              {...this.props}
              component={Login}
              path="/login"
              restricted={false}
              checkAuthenticateStatus={checkAuthenticateStatus}
            />
            <PublicRoute
              {...this.props}
              component={Register}
              path="/register"
              restricted={false}
              checkAuthenticateStatus={checkAuthenticateStatus}
            />
            <PrivateRoute component={Portfolio} path="/portfolio" />
            <PrivateRoute component={Transactions} path="/transactions" />
            <PrivateRoute component={DashBoard} path="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
