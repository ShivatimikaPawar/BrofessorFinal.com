import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        {/* Top nav links */}
        <div className="footer-nav">
          <a href="#">Home</a>
          <a href="#">Terms & Condition</a>
          <a href="#">Privacy</a>
          <a href="#">Contact us</a>
        </div>

        {/* Contact Info */}
        <div className="footer-contact-icons">
          <div><span>🌐</span> www.brofessor.com</div>
          <div><span>✉️</span> brofessor@gmail.com</div>
          <div><span>📞</span> Contact Us</div>
        </div>

        {/* Bottom left label */}
        <div className="footer-bottom-left">
          <img src="/brolo.png" alt="Logo" className="footer-logo" />
          <p>Made by the Brofessor Team</p>
        </div>

        {/* Chatbot button */}
        <button className="chatbot-launch-btn">
          <div className="chatbot-circle">
            <img src="/chatbotAI.png" alt="Chatbot" />
          </div>
        </button>
      </footer>
    </>
  );
};

export default Footer;



