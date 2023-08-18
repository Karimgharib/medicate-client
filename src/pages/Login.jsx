import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import Logo from "../assets/logo.png";
import axios from "axios";
import { ChatState } from "../context/chatContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { setUserInfo } = ChatState();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:3001/api/user/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
      console.log(data);
      if (data.isPatient) {
        navigate("/");
      } else if (data.isPatient === false) {
        navigate("/chathome");
      }
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper ">
        <span className="logo">
          <img src={Logo} width={200} alt="logo" />
        </span>
        <span className="title">Login</span>
        <form onSubmit={handleLogin}>
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign In</Button>
        </form>
        {err.length !== 0 && <Alert variant="danger">{err}</Alert>}

        <p>
          You Don't Have An Account?{" "}
          <Link className="text-decoration-underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
