// MainApp.js (or any other appropriate component where you want to set up routing)
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./routes";
import "./App.css"

// import TipsCards from './components/TipsCards/TipsCards';

export default function MainApp() {
  return (
    <Router>
      <MainRouter />
      {/* <TipsCards/> */}
    </Router>
  );
}