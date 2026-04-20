import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { LANGUAGES } from "./constants";
import styles from "./Header.module.css";

export default function MobileMenu({ open, onClose, onSelectLanguage, selectedLanguage, navLinks }) {
  const { t } = useTranslation("common");

  return (
    <>
      <div
        className={`${styles["mob-overlay"]} ${open ? styles["open"] : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`${styles["mob-menu"]} ${open ? styles["open"] : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles["mob-menu__inner"]}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={styles["mob-nav__link"]}
              onClick={onClose}
            >
              {t(link.label)}
            </Link>
          ))}
          <div className={styles["mob-divider"]} />
          <div className={styles["mob-lang"]}>
            <p className={styles["mob-lang__label"]}>Select Language</p>
            <div className={styles["mob-lang__options"]}>
              {LANGUAGES.map(({ code, name, flag }) => (
                <button
                  key={code}
                  className={`${styles["mob-lang__btn"]} ${selectedLanguage === code ? styles["selected"] : ""}`}
                  onClick={() => {
                    onSelectLanguage(code);
                    onClose();
                  }}
                >
                  <span>{flag}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles["mob-divider"]} />
          <div className={styles["mob-cta"]}>
            <a href="#get-started" className={`${styles["mob-btn"]} ${styles["mob-btn-fill"]}`} onClick={onClose}>Get Started →</a>
          </div>
        </div>
      </div>
    </>
  );
}
