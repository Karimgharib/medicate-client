import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import axios from "axios";
import { GoVerified } from "react-icons/go";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isPatient, setIsPatient] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [about, setAbout] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/api/user/register",
          {
            name,
            email,
            password,
            isPatient,
            specialization,
            about,
          }
        );
        console.log(response.data);
        setSuccess(true);
      } catch (error) {
        console.log(error);
        setErr(error.response.data.message);
      }
    }
  };

  return (
    <div className="formContainer">
      {success ? (
        <div className="formWrapper">
          <h4>You Are Signed Up Successfuly</h4>
          <GoVerified color="#198754" fontSize={40} />
          <Button>
            <Link to="/login" style={{ color: "#fff" }}>
              Go to login page
            </Link>
          </Button>
        </div>
      ) : (
        <div className="formWrapper">
          <img src={Logo} width={200} alt="logo" />
          <span className="title">Register</span>
          <form onSubmit={handleRegister}>
            <input
              required
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordsMatch && (
              <Alert variant="danger">Passwords do not match.</Alert>
            )}
            <label>
              <input
                required
                type="radio"
                name="userType"
                value="patient"
                onChange={(e) => {
                  setIsPatient(e.target.value === "patient" ? "true" : "false");
                  setSpecialization("");
                }}
              />
              Patient
            </label>
            <label>
              <input
                required
                type="radio"
                name="userType"
                value="doctor"
                onChange={(e) =>
                  setIsPatient(e.target.value === "patient" ? "true" : "false")
                }
              />
              Doctor
            </label>

            {isPatient === "false" && (
              <>
                <select
                  required
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option disabled value="">
                    specialization
                  </option>
                  <option value="Pulmonology">Pulmonology</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Neurologist">Neurologist</option>
                </select>
                <input
                  type="text"
                  placeholder="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </>
            )}

            <Button type="submit">Sign Up</Button>
            {err && <Alert variant="danger">{err}</Alert>}
          </form>
          <p>
            You Do Have An Account?{" "}
            <Link className="text-decoration-underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
