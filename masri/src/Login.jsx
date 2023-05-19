import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import ballooon from './images/balloons.png';
import NavBar from "./NavBar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        swal({
          title: "Login successful",
          icon: "success",
        }).then(() => {
          window.localStorage.setItem("token", response.data.token);
          if (response.data.userType === "superAdmin") {
            window.location.href = "/dashboard";
          } else if (response.data.userType === "user") {
            window.location.href = "/shop";
          } else {
            window.location.href = "/";
          }
        });
      } else {
        swal({
          title: "Login failed",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (

  <div className="navwithlog">
  
  <div className="allLog">
  <div className="image1Log">
    <img src={ballooon} alt="balloons"/>
  </div>
    <div className="login-container">
    
      <div className="border-reg1">
      <h1 className="login-h1">Login Page</h1>
      
      <form className="form-login" onSubmit={handleLoginSubmit}>
        <label htmlFor="email" className="label-login">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input-login"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password" className="label-login">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input-login"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="button-login" type="submit">
          Login
        </button>
      </form>
      <div className="registration">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
      </div>
    </div>
     <div className="image1Log">
    <img src={ballooon} alt="balloons"/>
  </div>
    </div>
    </div>
  );
}

export default Login;