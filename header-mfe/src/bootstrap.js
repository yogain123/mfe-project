import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import "./styles.css";

// This is for standalone development/testing of the Header MFE
// In the Shell app, only the Header component is imported
// Wrap with BrowserRouter for standalone mode to support useNavigate/useLocation
ReactDOM.render(
  <BrowserRouter>
    <Header />
  </BrowserRouter>,
  document.getElementById("root")
);
