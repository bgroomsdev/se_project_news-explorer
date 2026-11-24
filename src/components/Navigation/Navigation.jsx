import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logoutWhite from "../../assets/logoutWhite.svg";
import logoutDark from "../../assets/logoutDark.svg";

function Navigation({
  isLoggedIn,
  userName,
  isSavedNewsPage,
  isMenuOpen,
  onCloseMenu,
  onSignInClick,
  onLogoutClick,
}) {
  const getLinkClass = ({ isActive }) =>
    isActive ? "navigation__link navigation__link_active" : "navigation__link";

  return (
    <nav className={`navigation ${isMenuOpen ? "navigation_opened" : ""}`}>
      <NavLink
        to="/"
        end
        className={(navData) =>
          `${getLinkClass(navData)} navigation__link_home`
        }
        onClick={onCloseMenu}
      >
        Home
      </NavLink>

      {isLoggedIn && (
        <NavLink
          to="/saved-news"
          className={(navData) =>
            `${getLinkClass(navData)} navigation__link_saved-articles`
          }
          onClick={onCloseMenu}
        >
          Saved articles
        </NavLink>
      )}

      {isLoggedIn ? (
        <button
          type="button"
          className="navigation__button navigation__button_logged-in"
          onClick={onLogoutClick}
        >
          <p className="navigation__user-name">{userName}</p>
          <img
            src={isSavedNewsPage && !isMenuOpen ? logoutDark : logoutWhite}
            alt="Logout"
            className="navigation__logout-icon"
          />
        </button>
      ) : (
        <button
          type="button"
          className="navigation__button"
          onClick={onSignInClick}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
