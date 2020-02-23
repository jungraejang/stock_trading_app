import React, { useReducer, useState } from "react";
import View from "./View.js";
import axios from "axios";
import Auth from "../../../utils/Auth.js";
// import {withRouter} from "react-router-dom";

const Register = props => {
  if (Auth.isUserAuthenticated()) {
    props.history.push("/");
  }
  const [errorMessage, handleError] = useState(false);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      email: "",
      password: "",
      amount: 5000
    }
  );

  const handleChange = event => {
    const name = event.target.name;
    const newValue = event.target.value;
    setUserInput({ [name]: newValue });
  };

  const registerUser = event => {
    event.preventDefault();
    let { name, email, password, amount } = userInput;
    axios
      .post("/users/new", { name, email, password, amount })
      .then(user => {
        axios.post("/portfolio/create", { email });
      })
      .then(user => {
        axios.post("/users/login", { email, password });
      })
      .then(user => {
        Auth.authenticateUser(email);
      })
      .then(() => {
        props.checkAuthenticateStatus();
        handleError(false);
        props.history.push("/");
      })
      .catch(err => {
        console.log("errrrrrr: ", err.message);
        handleError(true);
      });
  };

  return (
    <div>
      <View
        handleChange={handleChange}
        registerUser={registerUser}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Register;
