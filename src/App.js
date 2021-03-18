import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import Register from "./Register and Login/Register";
import Login from "./Register and Login/Login";


class App extends Component {
  render() {
    return(
      <div className="App">
        <Register/>
        <Login/>
      </div>
    )
  }

}

export default App;
