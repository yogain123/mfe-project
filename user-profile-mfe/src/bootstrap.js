import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UserProfile from "./UserProfile";
import "./styles.css";

const userDataForStandalone = {
  id: "yogendr_123",
  name: "Yogendra Saxena",
  email: "yogendrasaxena56@gmail.com",
  role: "Software Engineer",
  avatar: "👨",
};

ReactDOM.render(
  <BrowserRouter>
    <UserProfile user={userDataForStandalone} />
  </BrowserRouter>,
  document.getElementById("root")
);
