import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/components.scss";
import "./pages/pages.scss";
import "./pages/chat.scss";
import ChatProvider from "./context/chatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
    <App />
  </ChatProvider>
);
