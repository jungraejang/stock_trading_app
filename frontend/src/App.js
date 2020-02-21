import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      test: "test"
    };
  }

  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <p>Welcome to Stockify</p>
      </div>
    );
  }
}

export default App;
