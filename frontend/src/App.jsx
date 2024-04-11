import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Add from "./components/Add";
import NavBar from "./components/NavBar";

import UserContext from "./context/user";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RateAndReview from "./components/RateAndReview";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    accessToken.length !== 0 ? setIsSignedIn(true) : setIsSignedIn(false);
  }, [accessToken.length]);

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          role,
          setRole,
          userProfile,
          setUserProfile,
          isSignedIn,
          setIsSignedIn,
        }}
      >
        <NavBar></NavBar>
        {accessToken.length > 0 && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="add"
              element={
                <Add
                  accessTokenLength={accessToken.length}
                  showLogin={showLogin}
                  setShowLogin={setShowLogin}
                />
              }
            />
            <Route
              path="search"
              element={
                <Search
                  accessTokenLength={accessToken.length}
                  showLogin={showLogin}
                  setShowLogin={setShowLogin}
                />
              }
            />
            <Route
              path="review"
              element={
                <RateAndReview
                  accessTokenLength={accessToken.length}
                  showLogin={showLogin}
                  setShowLogin={setShowLogin}
                />
              }
            />
          </Routes>
        )}
        {!accessToken && ( // Render Home only if user is not logged in
          <Home
            accessTokenLength={accessToken.length}
            showLogin={showLogin}
            setShowLogin={setShowLogin}
          />
        )}
      </UserContext.Provider>
    </>
  );
}

export default App;
