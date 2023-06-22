import React from "react";
import "./FooterStyles.css";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin, faWhatsapp,  faTiktok} from '@fortawesome/free-brands-svg-icons';
import logooWhite from '../images/logoo.png'
const Footer = () => {
	const location = useLocation();
  const whatsappURL = `https://wa.me/+9613797847`;

  return (
    <footer class="footer-distributed">
      <div class="footer-left">
        <h3>
          <img src={logooWhite} />
        </h3>

        <p class="footer-links">
          <a href="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </a>
          <a
            href="/Balloons"
            className={location.pathname === "/Balloons" ? "active" : ""}
          >
            Products
          </a>{" "}
          <a
            href="/decoration"
            className={location.pathname === "/decoration" ? "active" : ""}
          >
            Decoration
          </a>{" "}
          <a
            href="/contactUs"
            className={location.pathname === "/contactUs" ? "active" : ""}
          >
            ContactUs
          </a>{" "}
          <a
            href="/order"
            className={location.pathname === "/order" ? "active" : ""}
          >
            Cart
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
          <a href="https://www.tiktok.com/@masridecorations?lang=en&is_from_webapp=1&sender_device=mobile&sender_web_id=7239109929196586502">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
          <a href={whatsappURL}>
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href="https://instagram.com/masri_decorations?igshid=MmJiY2I4NDBkZg==">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.facebook.com/masribirthady">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;