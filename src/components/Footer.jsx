import { Link } from "react-router";
import styles from "./Footer.module.css";
import logo from "../assets/logo.png";

export function Footer() {
  return (
    <footer className={styles["fp-footer"]}>
      {/* Glow / bleed background */}
      <div className={styles["fp-footer__glow"]} />

      <div className={styles["fp-footer__container"]}>
        {/* Brand column */}
        <div className={styles["fp-footer__brand"]}>
          <img src={logo} alt="FinPay Africa" className={styles["fp-footer__logo"]} />
          <p className={styles["fp-footer__description"]}>
            Connecting Africa through smart digital payments.
            Fast, secure, and borderless financial services for everyone.
          </p>
        </div>

        {/* Links */}
        <div className={styles["fp-footer__links"]}>
          <div>
            <h4>Solutions</h4>
            <Link to="#">Money Transfer</Link>
            <Link to="#">Digital Wallet</Link>
            <Link to="#">Bank Cards</Link>
            <Link to="#">POS Terminals</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="#">Our Team</Link>
            <Link to="#">Careers</Link>
            <Link to="#">Blog</Link>
          </div>

          <div>
            <h4>Resources</h4>
            <Link to="#">Help Center</Link>
            <Link to="#">API Docs</Link>
            <Link to="#">Security</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Compliance</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className={styles["fp-footer__newsletter"]}>
          <h3>Stay Updated</h3>
          <p>
            Subscribe to our newsletter for the latest updates,
            features, and insights.
          </p>

          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles["fp-footer__bottom"]}>
        © 2026 FinPay Africa. Powered by NSI.
      </div>
    </footer>
  );
}