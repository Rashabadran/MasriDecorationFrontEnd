import React from "react";
import "./FooterStyles.css";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin, faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import logooWhite from './images/logoo.png'
const FooterDash = () => {
	const location = useLocation();

  return (
    <footer class="footer-distributed">
      <div class="footer-left">
        <h3>
          <img src={logooWhite} />
        </h3>

        <p class="footer-links">
          <a href="/" className={location.pathname === "/" ? "f-active" : ""}>
            Home
          </a>
          <a href="/" className={location.pathname === "/" ? "f-active" : ""}>
            Product
          </a>{" "}
          <a
            href="/productDashboard"
            className={location.pathname === "/" ? "f-active" : ""}
          >
            Home
          </a>{" "}
          <a href="/" className={location.pathname === "/" ? "f-active" : ""}>
            Home
          </a>{" "}
          <a href="/" className={location.pathname === "/" ? "f-active" : ""}>
            Home
          </a>
        </p>

        <p class="footer-company-name">Masri Decoration © 2022</p>
      </div>

      <div class="footer-center">
        <div>
          <i class="fa fa-map-marker"></i>
          <p>
            More Information
            <br />
            <br />
            <span>Dawhet Aramoun</span> facing Blom Bank
          </p>
        </div>

        <div>
          <i class="fa fa-phone"></i>
          <p>03-797847</p>
        </div>

        <div>
          <i class="fa fa-envelope"></i>
        </div>
      </div>

      <div class="footer-right">
        <p class="footer-company-about">
          <span>About the company</span>
          We specialize in curating an enchanting collection of balloons and
          decorations for every occasion.
        </p>

        <div class="footer-icons">
          <a href="https://instagram.com/masri_decorations?igshid=MmJiY2I4NDBkZg==">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href="">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default FooterDash;