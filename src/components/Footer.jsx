import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="contact" style={{ backgroundImage: "url('homePage.png')" }}>
      <div className="footer-container">
        <div className="footer-section logo">
          <img src="logoSide-06.png" alt="Ebdaa Media" className="logo-img" />
          <p style={{ color: '#0aa3bf' }}>إبداع ميديا للدعاية والإعلان والتسويق الإبداعي</p>
        </div>

        <div className="footer-section social">
          <h3>تابعنا على ...</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/share/16S8oEcweL/?mibextid=wwXIfr" target="_blank" rel="noreferrer">
              <img src="facebook.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/ebdaamedia2025/"  target="_blank" rel="noreferrer">
              <img src="instagram.png" alt="Instagram" />
            </a>
          </div>
          <p>www.ebdaa-media.com</p>
        </div>

        <div className="footer-section contact">
          <h3>تواصل معنا ...</h3>
          <div className="footer-item">
            <img src="phone.png" alt="Phone" />
            <span>02-366900</span>
          </div>
          <a 
            href="https://wa.me/+967777730311" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-item"
          >
            <img src="whatsapp.png" alt="WhatsApp" />
            <span>777730311</span>
          </a>
          <a 
            href="mailto:info@ebdaa-media.com" 
            className="footer-item"
          >
            <img src="mail.png" alt="Email" />
            <span>info@ebdaa-media.com</span>
          </a>
          <div className="footer-item">
            <img src="web.png" alt="Website" />
            <span>www.ebdaa-media.com</span>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
