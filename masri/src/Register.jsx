import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import swal from "sweetalert";
import NavBar from "./NavBar";
import ballooon from './images/balloons.png';
import { Link } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        "https://masrishop.onrender.com/users/all",
        {
          params: {
            email: email,
          },
        }
      );
      
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw new Error("An error occurred while checking email existence");
    }
    
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const emailExists = await checkEmailExists(email);
      
      if (emailExists) {
        swal({
          title: "Register failed",
          text: "Email already exists",
          icon: "error",
        });
        return;
      } 
      else if (!name || !email || !password) {
      swal({
        title: "Error",
        text: "Please fill in all the fields",
        icon: "error",
      });
      return;
    }
      else {
        const response = await axios.post(
          "https://masrishop.onrender.com/users/",
          {
            name,
            email,
            password,
            role: "user",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
      
          swal({
            title: "Register successful",
            icon: "success",
          }).then(() => {
            window.localStorage.setItem("token", response.data.token);
            window.location.href = "/login";
          });
        } else {
          swal({
            title: "Register failed",
            text: response.data.message,
            icon: "error",
          });
        }
      }
    } catch (error) {
      swal({
        title: "Register failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="allRegister">
      <div className="allLog">
        <div className="image1Log">
          <img src={ballooon} alt="balloons" />
        </div>
        <div className="register-container">
          <div className="border-reg">
            <h1 className="register-h1">Register Page</h1>
            <form className="form-register" onSubmit={handleRegisterSubmit}>
              <label htmlFor="username" className="label-register">
                Username:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-register"
                onChange={handleNameChange}
              />
              <label htmlFor="email" className="label-register">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-register"
                onChange={handleEmailChange}
              />
              <label htmlFor="password" className="label-register">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input-register"
                onChange={handlePasswordChange}
              />
              <button type="submit" className=" daily-button ">
                Register
              </button>
               <div className="registration">
              <p>
                Do you have an account? <Link to="/login" className="reg">Login here</Link>
              </p>
              </div>
            </form>
          </div>
        </div>
        <div className="image1Log">
          <img src={ballooon} alt="balloons" />
        </div>
      </div>
    </div>
  );
}

export default Register;
