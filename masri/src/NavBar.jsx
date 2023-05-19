
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import  './NavBar.css';
import { useLocation,useNavigate } from 'react-router-dom';
 import logo from '../src/images/logoo.png';


function NavBar() {

  let navigate=useNavigate();
  const [show, setShow] = useState(false);
  const [nav, setNav] = useState(false)
  const [menu, setMenu] = useState("nav-links");
  const [icon, setIcon] = useState("bx bx-menu");
  const location = useLocation();

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

  function navbar(){
    if (window.scrollY >= 851){
      setNav(true)
    }
    else{
      setNav(false)
    }
  }

  const handleSignClick = () => {
    navigate("/login")
    setMenu("nav-links");
    setIcon("bx bx-menu");
 
  };

  window.addEventListener("scroll", navbar);

  return (
    <header className={nav ? 'not' : 'sticky-header'}>
      <a href="/" className="logo">
         <img src={logo} alt="Masri logo" className="header-logo" /> 
        
      </a>
      <ul className={menu}>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </a>
        </li>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/shop" className={location.pathname === '/shop' ? 'active' : ''}>
            Shop
          </a>
        </li>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/aboutUs" className={location.pathname === '/aboutUs' ? 'active' : ''}>
            About us
          </a>
        </li>
        {/* <li className={nav ? 'maintain' : 'normal'}>
          <a href="/discounts" className={location.pathname === '/discounts' ? 'active' : ''}>
            Discounts
          </a>
        </li> */}
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/contactus" className={location.pathname === '/contactus' ? 'active' : ''}>
            Contact us
          </a>
        </li>
        <li className="willhide">
          <p onClick={handleSignClick} className={location.pathname === '/sign-in' ? 'active' : ''}>
            
          </p>
        </li>
      </ul>
      <div  className={nav ? 'head-icons' : 'header-icons'}>
        <p onKeyDown={(e) => {
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
        <div className={icon} id="menu-icon" onClick={toggle}></div>
      </div>
    </header>
  );
}

export default NavBar;