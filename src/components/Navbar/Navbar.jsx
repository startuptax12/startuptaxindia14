
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

/* =========================================================
   NAVBAR LINKS
   ========================================================= */

const navbarLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "GST Solutions", href: "#gst-calculator" },
  { label: "FAQ", href: "#faq" },
  { label: "Pricing", href: "#pricing" },
  { label: "About Us", href: "#why-us" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /* =========================================================
     HANDLE SCROLL
     ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     CLOSE MENU ON DESKTOP RESIZE
     ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =========================================================
     CLOSE MENU WITH ESCAPE KEY
     ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =========================================================
     NAVIGATION HANDLER
     ========================================================= */

  const handleNavigation = () => {
    setMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen((previous) => !previous);
  };

  return (
    <header
      className={`gst-navbar ${
        isScrolled ? "gst-navbar--scrolled" : ""
      }`}
    >
      <div className="gst-navbar__container">

        {/* BRAND / LOGO */}

        <a
          href="#home"
          className="gst-navbar__brand"
          onClick={handleNavigation}
          aria-label="Startup Tax India Home"
        >
          <img
            src="/logo.png"
            alt="Startup Tax India"
            className="gst-navbar__logo"
          />
        </a>

        {/* NAVIGATION MENU */}

        <nav
          id="gst-navbar-menu"
          className={`gst-navbar__menu ${
            menuOpen ? "gst-navbar__menu--open" : ""
          }`}
          aria-label="Main navigation"
        >
          {navbarLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="gst-navbar__link"
              onClick={handleNavigation}
            >
              {link.label}
            </a>
          ))}

          {/* NAVBAR CTA */}

          <a
            href="#contact"
            className="gst-navbar__cta"
            onClick={handleNavigation}
          >
            Talk to Expert
          </a>
        </nav>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className="gst-navbar__toggle"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="gst-navbar-menu"
          onClick={handleMenuToggle}
        >
          {menuOpen ? (
            <X size={22} strokeWidth={2} />
          ) : (
            <Menu size={22} strokeWidth={2} />
          )}
        </button>

      </div>
    </header>
  );
}
