import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const ChatHome = () => {
  return (
    <div className="home">
      <div className="contain">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatHome;
