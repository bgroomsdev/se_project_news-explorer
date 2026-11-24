import { Link } from "react-router-dom";
import "./Footer.css";
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <div className="footer__links-group">
        <nav className="footer__nav">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a
            href="https://tripleten.com"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            TripleTen
          </a>
        </nav>
        <div className="footer__socials">
          <a
            href="https://github.com/bgroomsdev"
            target="_blank"
            rel="noreferrer"
            className="footer__social-link"
          >
            <img src={githubIcon} alt="GitHub" className="footer__icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/braden-grooms-670074376/"
            target="_blank"
            rel="noreferrer"
            className="footer__social-link"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="footer__icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
