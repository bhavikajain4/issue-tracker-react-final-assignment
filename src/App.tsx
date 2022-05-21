import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create_Issue from "./Components/Create_Issue/Create_Issue";
import Dashboard from "./Components/Dashboard/Dashboard";
import Protected from "./Components/Protected/Protected";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Protected isLoggedIn={localStorage.getItem("isAuth")}>
                <Dashboard />
              </Protected>
            }
          />
          <Route path="/" element={<Login />} />

          <Route
            path="/create_issue"
            element={
              <Protected isLoggedIn={localStorage.getItem("isAuth")}>
                <Create_Issue />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
