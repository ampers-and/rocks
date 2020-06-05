import React, { useState, useEffect } from "react";
import { getHashParams } from "../utils/getHashParams";
// import RecentlyPlayed from "./RecentlyPlayed";
// import { ErrorMessage } from "./ErrorMessage";

import UserCard from "./UserCard";

function UserProfile() {
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

  console.log(user);
  if (error) {
    // return <ErrorMessage />;
    return <p />;
  }

  if (!accessToken) {
    return (
      <div>
        <a href="https://spotify-data-viz.herokuapp.com/login">
          Login to Spotify
        </a>
      </div>
    );
  }
  return (
    <div>
      <h2>Current User: {user && user.display_name}</h2>
      {/* <RecentlyPlayed
        user={user}
        accessToken={accessToken}
        refreshToken={refreshToken}
      /> */}
      {/* {user && <UserCard user={user} />} */}
    </div>
  );
}

export default UserProfile;
