import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import UserProfile from "./components/UserProfile";

import { Route, Switch } from "react-router-dom";

import UserContext from "./contexts/UserContext";

import { getHashParams } from "./utils/getHashParams";

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);

  const handleRequest = (access_token, refresh_token, error) => {
    if (error) {
      setError(error);
    } else {
      if (access_token) {
        fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            setUser(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  useEffect(() => {
    const params = getHashParams();

    let { access_token, refresh_token, error } = params;
    // let refresh_token = params.refresh_token;
    // let error = params.error;

    handleRequest(access_token, refresh_token, error);
  }, []);

  return (
    <UserContext.Provider value={{ user, accessToken, refreshToken, error }}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Switch>
            {/* <Route exact path="/" component={LandingPage} /> */}
            <Route exact path="/" component={UserProfile} />
          </Switch>
        </header>
      </div>
    </UserContext.Provider>
  );
}

export default App;
