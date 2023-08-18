import React, { useEffect, useState } from "react";
import { ChatState } from "../context/chatContext";
import axios from "axios";
import { getSender, getSenderFull } from "../config/ChatLogic";
import { Spinner } from "react-bootstrap";

const Chats = () => {
  const { selectedChat, setSelectedChat, userInfo, chats, setChats } =
    ChatState();
  const [loggedUser, setLoggedUser] = useState({});

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `http://127.0.0.1:3001/api/chat/`,
        {
          userId,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userInfo) return;
    const fetchChats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo")).token
            }`,
          },
        };

        const { data } = await axios.get(
          "http://127.0.0.1:3001/api/chat",
          config
        );

        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };

    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));

    fetchChats();
  }, [chats]);

  return (
    <div className="chats">
      {chats.length !== 0 ? (
        chats.map(
          (chat) =>
            getSender(loggedUser, chat.users) && (
              <div
                className="userChat"
                key={chat._id}
                onClick={() => {
                  accessChat(chat._id);
                  setSelectedChat(chat);
                }}
                style={{
                  backgroundColor: selectedChat?._id === chat._id && "#008fe2",
                }}
              >
                <img src={getSenderFull(loggedUser, chat.users).pic} alt="" />
                <div className="userChatInfo">
                  {getSenderFull(loggedUser, chat.users).specialization && (
                    <h6 style={{ color: "#777" }}>
                      {getSenderFull(loggedUser, chat.users).specialization}
                    </h6>
                  )}
                  <span>{`${
                    getSenderFull(loggedUser, chat.users).isPatient === false
                      ? "Dr."
                      : ""
                  } ${getSender(loggedUser, chat.users)}`}</span>
                  <p>
                    {chat?.latestMessage?.content.length > 50
                      ? chat?.latestMessage?.content.substring(0, 51) + "..."
                      : chat?.latestMessage?.content}
                  </p>
                </div>
              </div>
            )
        )
      ) : (
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ height: `calc(100vh - 50px)` }}
        >
          <Spinner animation="border" role="status" style={{ color: "#fff" }} />
        </div>
      )}
    </div>
  );
};

export default Chats;
