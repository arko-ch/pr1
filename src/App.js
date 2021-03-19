import './App.css';
import React, { Component } from "react";
import Register from "./components/Inbox";
import Login from "./components/Login";


class App extends Component {
  render() {
    return(
      <div className="App">
        <Login/>
      </div>
    )
  }

}

export default App;
