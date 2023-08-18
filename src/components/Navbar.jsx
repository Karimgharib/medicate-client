import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/footer_logo.png";
import { ChatState } from "../context/chatContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { userInfo, setSelectedChat } = ChatState();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setSelectedChat(null);
    navigate("/");
  };

  return (
    <div className="navbar">
      <span className="logo">
        <img src={Logo} alt="logo" width={100} />
      </span>
      <div className="user">
        <img src={userInfo?.pic} alt="" />
        <span>{userInfo?.name}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
