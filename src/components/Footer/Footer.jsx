import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

import "./Footer.css";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="gst-container">
        {/* Main Footer */}
        <div className="site-footer__main">

          {/* Brand Section */}
          <div className="site-footer__brand">
            <a
              href="#home"
              className="site-footer__brand-link"
              aria-label="Startup Tax India Home"
            >
              <img
                src="/logo.png"
                alt="Startup Tax India"
                className="site-footer__logo"
              />
            </a>

            <p className="site-footer__description">
              Register, file, protect and grow — your trusted compliance
              partner for every stage of business in India.
            </p>

            {/* Social Media */}
            <div
              className="site-footer__social"
              aria-label="Social media links"
            >
              {/* Replace these URLs with your actual company profiles */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="site-footer__col">
            <h4>Our Services</h4>

            <a href="#services">Private Limited</a>
            <a href="#services">LLP Registration</a>
            <a href="#services">GST Registration</a>
            <a href="#services">Trademark Registration</a>
            <a href="#services">ISO Certification</a>
          </div>

          {/* Company */}
          <div className="site-footer__col">
            <h4>Company</h4>

            <a href="#why-us">About Us</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact Us</a>
            <a href="#faq">FAQs</a>

            <a href="/careers" className="site-footer__external-link">
              Careers
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Resources */}
          <div className="site-footer__col">
            <h4>Resources</h4>

            <a href="#faq">Help Center</a>
            <a href="#gst-calculator">GST Calculator</a>
            <a href="#faq">Compliance Guide</a>
            <a href="#faq">Due Date Support</a>
            <a href="#contact">Talk to an Expert</a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="site-footer__bottom">

          <p className="site-footer__copyright">
            © {currentYear} Startup Tax India. All rights reserved.
          </p>

          <nav
            className="site-footer__legal"
            aria-label="Legal information"
          >
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms & Conditions</a>
            <a href="/refund-policy">Refund Policy</a>
          </nav>

          <div className="site-footer__secure">
            <ShieldCheck size={15} aria-hidden="true" />
            <span>Secure & Confidential</span>
          </div>

        </div>
      </div>
    </footer>
  );
}