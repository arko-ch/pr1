import './App.css';
import React, { Component } from "react";
import Register from "./components/Inbox";
import Login from "./components/Login";
import { BrowserRouter, Route } from "react-router-dom";
import { Security, SecureRoute } from "@okta/okta-react";

class App extends Component {
  render() {
    return(
      // <BrowserRouter>
      //   <Security >
      <div className="App">
        <Login/>
      </div>
      //   </Security>
      // </BrowserRouter>
    )
  }

}

export default App;
