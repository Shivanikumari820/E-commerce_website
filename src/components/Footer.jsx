import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>SmartKart 📱</h3>
          <p>Your one-stop shop for the latest smartphones, accessories, and unbeatable deals.</p>
          <p>📍 New Delhi, India</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 support@smartkart.com</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/product">All Products</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-social">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Subscribe</h3>
          <p>Stay updated with new launches and special offers.</p>
          <div className="footer-newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} SmartKart. All rights reserved.
      </div>
    </footer>
  );
}
