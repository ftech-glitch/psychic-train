import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Add from "./components/Add";
import NavBar from "./components/NavBar";

import UserContext from "./context/user";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>

      <UserContext.Provider value={{ accessToken, setAccessToken, role, setRole }}>
        <NavBar></NavBar>
        {accessToken.length > 0 && <Routes>
          <Route path="/" element={<Home />} />
          <Route path="add" element={<Add />} />
          <Route path="search" element={<Search />} />
        </Routes>}
        <Home accessTokenLength={accessToken.length} showLogin={showLogin} setShowLogin={setShowLogin}></Home>
      </UserContext.Provider>

    </>
  );
}

export default App;
