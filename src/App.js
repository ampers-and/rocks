import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <Switch>
            {/* <Route exact path="/" component={LandingPage} /> */}
            <Route exact path="/" component={UserProfile} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
