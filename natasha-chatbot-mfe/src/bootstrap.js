import React from "react";
import ReactDOM from "react-dom";
import NatashaChatbot from "./NatashaChatbot";
import "./styles.css";

// This is for standalone development/testing of the Header MFE
// In the Shell app, only the Header component is imported
// Wrap with BrowserRouter for standalone mode to support useNavigate/useLocation
ReactDOM.render(<NatashaChatbot />, document.getElementById("root"));
