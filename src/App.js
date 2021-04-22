import React, { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1057236748096613",
        cookie: true,
        xfbml: true,
        version: "v10.0",
      });

      window.FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    };
  }, [loggedIn]);

  function statusChangeCallback(response) {
    if (response.status === "connected") {
      setLoggedIn(true);
      window.FB.api("/me", function (response) {
        setUsername(response.name);
      });
    } else {
      setLoggedIn(false);
    }
  }

  function loginHandler() {
    window.FB.login(
      function (response) {
        statusChangeCallback(response);
      },
      { scope: "public_profile,email" }
    );
  }
  function logoutHandler() {
    window.FB.logout((response) => {
      statusChangeCallback(response);
    });
  }

  return (
    <>
      {loggedIn ? (
        <>
          <h1>{username}, you are logged in </h1>
          <button onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <button onClick={loginHandler}>Login</button>
      )}
    </>
  );
}

export default App;
