import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create_Issue from "./Components/Create_Issue/Create_Issue";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create_issue" element={<Create_Issue />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
