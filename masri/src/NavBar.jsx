import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./NavBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../src/images/logoo.png";
import cart from "./images/carts.png";


function NavBar() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [nav, setNav] = useState(false);
  const [menu, setMenu] = useState("nav-links");
  const [icon, setIcon] = useState("bx bx-menu");
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    setShow(false);
    setMenu("nav-links");
    setIcon("bx bx-menu");
  }, [location]);

  const toggle = () => {
    if (!show) {
      setMenu("nav-links open");
      setIcon("bx bx-x");
    } else {
      setMenu("nav-links");
      setIcon("bx bx-menu");
    }
    setShow(!show);
  };

  function navbar() {
    if (window.scrollY >= 851) {
      setNav(true);
    } else {
      setNav(false);
    }
  }

  const handleSignClick = () => {
    navigate("/login");
    setMenu("nav-links");
    setIcon("bx bx-menu");
  };

  const handleSignout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  
  window.addEventListener("scroll", navbar);

  return (
    <header className={nav ? "not" : "sticky-header"}>
      <a href="/" className="logo">
        <img src={logo} alt="Masri logo" className="header-logo" />
      </a>
      <ul className={menu}>
        <li className={nav ? "maintain" : "normal"}>
          <a href="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </a>
        </li>
        <li className={nav ? "maintain" : "normal"}>
          <a
            href="/balloons"
            className={location.pathname === "/balloons" ? "active" : ""}
          >
            Shop
          </a>
        </li>
        <li className={nav ? "maintain" : "normal"}>
          <a
            href="/decoration"
            className={location.pathname === "/decoration" ? "active" : ""}
          >
            Decoration
          </a>
        </li>
        <li className={nav ? "maintain" : "normal"}>
          <a
            href="/contactus"
            className={location.pathname === "/contactus" ? "active" : ""}
          >
            ContactUs
          </a>
        </li>
        {token ? (
          <li className={nav ? "maintain" : "normal"}>
            <p onClick={handleSignout} className="ri-user-3-fill">
              Logout
            </p>
          </li>
        ) : (
          <li className={nav ? "maintain" : "normal"}>
            <p
              onClick={handleSignClick}
              className={`{
                location.pathname === "/login" ? "active" : ""
              }ri-user-3-fill`}
            >
              Sign In
            </p>
          </li>
        )}
        <li>
          <Link to="/order">
            <img src={cart} alt="cart" />
          </Link>
        </li>
      </ul>
      <div className={nav ? "maintain" : "normal"}>
        {/* {token ? (
          <p onClick={handleSignout}>Logout</p>
        ) : (
          <p
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleSignClick();
              }
            }}
            onClick={handleSignClick}
            tabIndex="0"
            className="user"
          >
            <i className="ri-user-3-fill"></i>Sign-in
            <li>
              <Link>
                {" "}
                <img src={cart} alt="cart" />
              </Link>
            </li>
          </p>
        )} */}
        <div className={icon} id="menu-icon" onClick={toggle}>
          
        </div>
      </div>
    </header>
  );
}

export default NavBar;
