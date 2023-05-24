import React from "react";
import Navbar from "./Navbar";
import Chats from "./Chats";
import { ChatState } from "../context/chatContext";

const Sidebar = () => {
  const { selectedChat } = ChatState();
  return (
    <div className={`sidebar ${selectedChat ? "d-none d-md-block" : ""}`}>
      <Navbar />
      <Chats />
    </div>
  );
};

export default Sidebar;
