import React, { useReducer, useState } from "react";
import View from "./View.js";
import axios from "axios";
import Auth from "../../../utils/Auth.js";
import { withRouter } from "react-router-dom";

const Login = withRouter(props => {
  if (Auth.isUserAuthenticated()) {
    props.history.push("/");
  }
  const [errorMessage, handleError] = useState(false);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: ""
    }
  );

  const handleChange = event => {
    const name = event.target.name;
    const newValue = event.target.value;
    setUserInput({ [name]: newValue });
  };

  const redirectRegisterPage = event => {
    props.history.push("/register");
  };

  const loginUser = event => {
    let { email, password } = userInput;
    event.preventDefault();
    axios
      .post("/api/users/login", { email, password })
      .then(() => {
        Auth.authenticateUser(email);
      })
      .then(() => {
        props.checkAuthenticateStatus();
        setUserInput({ email: "", password: "" });
        handleError(false);
        props.history.push("/");
      })
      .catch(err => {
        handleError(true);
        console.log("Error: ", err);
      });
  };

  return (
    <>
      <View
        handleChange={handleChange}
        loginUser={loginUser}
        errorMessage={errorMessage}
        redirectRegisterPage={redirectRegisterPage}
      />
    </>
  );
});

export default Login;
