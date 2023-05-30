import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./NavBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../src/images/logoo.png";

function NavBarDash() {
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
          <a
            href="/productDashboard"
            className={
              location.pathname === "/productDashboard" ? "active" : ""
            }
          >
            Products
          </a>
        </li>
        <li className={nav ? "maintain" : "normal"}>
          <a
            href="/decorationDashboard"
            className={
              location.pathname === "/decorationDashboard" ? "active" : ""
            }
          >
            Decoration
          </a>
        </li>
        <li className={nav ? "maintain" : "normal"}>
          <a
            href="/OrderDashboard"
            className={location.pathname === "/OrderDashboard" ? "active" : ""}
          >
            Orders
          </a>
        </li>
        {/* <li className={nav ? 'maintain' : 'normal'}>
          <a href="/discounts" className={location.pathname === '/discounts' ? 'active' : ''}>
            Discounts
          </a>
        </li> */}
        <li className={nav ? "maintain" : "normal"}>
          <a
            href="/reservationDashboard"
            className={
              location.pathname === "/reservationDashboard" ? "active" : ""
            }
          >
            Reservations
          </a>
        </li>
        <li className="willhide">
          {token ? (
            <li className={nav ? "maintain" : "normal"}>
              <p onClick={handleSignout}>Logout</p>
            </li>
          ) : (
            <li className={nav ? "maintain" : "normal"}>
              <p
                onClick={handleSignClick}
                className={location.pathname === "/login" ? "active" : ""}
              >
                Sign In
              </p>
            </li>
          )}
        </li>
      </ul>
      <div className={nav ? "head-icons" : "header-icons"}>
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
            <i class="ri-user-3-fill"></i>Sign-in
          </p>
        )} */}

        <div className={icon} id="menu-icon" onClick={toggle}></div>
      </div>
    </header>
  );
}

export default NavBarDash;
