import React, { useEffect, useRef, useState } from "react";
import { ChatState } from "../context/chatContext";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import {
  getSender,
  getSenderFull,
  formatDateTime,
} from "./../config/ChatLogic";
import { Button, Spinner } from "react-bootstrap";

import io from "socket.io-client";

const ENDPOINT = "http://localhost:8900";
var socket, selectedChatCompare;

const Chat = () => {
  const { selectedChat, userInfo, setSelectedChat } = ChatState();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    socket.emit("stop typing", selectedChat._id);

    if (!input) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/message",
        {
          content: input,
          chatId: selectedChat,
        },
        config
      );
      socket.emit("new message", data);
      setMessages([...messages, data]);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://127.0.0.1:3001/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`chat ${selectedChat ? "" : "d-none d-md-block"}`}>
      {selectedChat ? (
        <>
          <div className="chatInfo">
            <div className="info">
              <BsArrowLeft
                onClick={() => setSelectedChat(null)}
                // color=""
                style={{ cursor: "pointer" }}
                className="d-md-none"
              />
              <img
                src={getSenderFull(userInfo, selectedChat.users).pic}
                alt=""
              />
              <span>{`${
                getSenderFull(userInfo, selectedChat.users).isPatient === false
                  ? "Dr."
                  : ""
              } ${getSender(userInfo, selectedChat.users)}`}</span>
              <span style={{ color: "#777", fontSize: 12 }}>
                {getSenderFull(userInfo, selectedChat.users).specialization}
              </span>
            </div>
          </div>
          {/* message component */}
          {loading ? (
            <div
              className=" d-flex justify-content-center align-items-center"
              style={{ height: `calc(100vh - 100px)` }}
            >
              <Spinner
                animation="border"
                role="status"
                style={{ color: "#008fe2" }}
              />
            </div>
          ) : (
            <div className="messages">
              {messages.map((message) => (
                <div
                  className={`message ${
                    message.sender._id === userInfo._id && "owner"
                  }`}
                  key={message._id}
                >
                  <div className="messageInfo"></div>
                  <div className="messageContent">
                    <p>{message.content}</p>
                    <h6>{formatDateTime(message.createdAt)}</h6>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* <Message /> */}
          {/* input component */}
          <div className="input">
            <input
              type="text"
              placeholder="Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <div className="send">
              <div className="attach"></div>
              {/* <input type="file" id="file" style={{ display: "none" }} />
              <label htmlFor="file">
                <IoIosAttach />
              </label> */}
              <Button onClick={handleSend}>
                <AiOutlineSend />
              </Button>
            </div>
          </div>
          {/* <Input /> */}
        </>
      ) : (
        <div className=" d-flex justify-content-center align-items-center h-100">
          <h2 style={{ color: "#777" }}>Start Conversation</h2>
        </div>
      )}
    </div>
  );
};

export default Chat;
