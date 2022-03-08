import React from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {Home, CreatePost, Login } from "../../pages/index";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase-config";

export const Routelinks = () => {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    const signUserOut = () => {
      signOut(auth).then(() => {
        localStorage.clear();
        setIsAuth(false);
        window.location.pathname = "/login";
      });
    };

    const item = [
        {path:"/", Component:Home},
        {path:"/createpost", Component:CreatePost},
        {path:"/login", Component:Login}
    ]

    const Protected = [
      {path:"/login", Component:Login}
  ]
  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>

        {!isAuth ? (
          <Link to="/login" className="login"> Login </Link>
        ) : (
          <div>
            <Link to="/createpost"> Create Post </Link>
            <Link to="/login" onClick={signUserOut} className="out"> Log Out</Link>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}
