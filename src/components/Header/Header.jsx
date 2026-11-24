import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";
import menuWhite from "../../assets/menuWhite.svg";
import menuDark from "../../assets/menuDark.svg";
import closeWhite from "../../assets/close-icon.svg";

function Header({ isLoggedIn, onSignInClick, onLogoutClick, userName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  function handleMenuToggle() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header
      className={`header ${isSavedNewsPage && !isMenuOpen ? "header_theme_light" : ""} ${isMenuOpen ? "header_menu_open" : ""}`}
    >
      <Link to="/" className="header__logo" onClick={handleCloseMenu}>
        NewsExplorer
      </Link>

      <button
        type="button"
        className="header__menu-button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={handleMenuToggle}
      >
        <img
          src={isMenuOpen ? closeWhite : isSavedNewsPage ? menuDark : menuWhite}
          alt=""
          className="header__menu-icon"
        />
      </button>

      {isMenuOpen && (
        <div className="header__overlay" onClick={handleCloseMenu} />
      )}

      <Navigation
        isLoggedIn={isLoggedIn}
        onSignInClick={() => {
          handleCloseMenu();
          onSignInClick();
        }}
        onLogoutClick={() => {
          handleCloseMenu();
          onLogoutClick();
        }}
        userName={userName}
        isSavedNewsPage={isSavedNewsPage}
        isMenuOpen={isMenuOpen}
        onCloseMenu={handleCloseMenu}
      />
    </header>
  );
}

export default Header;
