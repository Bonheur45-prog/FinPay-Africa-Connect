import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { LANGUAGES } from "./constants";
import styles from "./Header.module.css";

export default function MobileMenu({ open, onClose, onSelectLanguage, selectedLanguage, navLinks, solutionItems }) {
  const { t } = useTranslation("common");
  const [solutionsOpen, setSolutionsOpen] = useState(false);

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
          {navLinks.map((link) => {
            const isSolutions = link.label === "header.solutions";

            if (isSolutions) {
              return (
                <div key={link.label} className={styles["mob-nav__item"]}>
                  <button
                    className={`${styles["mob-nav__link"]} ${styles["mob-nav__link--dropdown"]} ${solutionsOpen ? styles["open"] : ""}`}
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                  >
                    <span>{t(link.label)}</span>
                    <ChevronDown size={20} className={styles["mob-caret"]} />
                  </button>
                  <div className={`${styles["mob-dropdown"]} ${solutionsOpen ? styles["open"] : ""}`}>
                    {solutionItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          className={styles["mob-dropdown__item"]}
                          onClick={onClose}
                        >
                          <div className={styles["mob-dropdown__icon"]} style={{ "--icon-bg": item.bgColor }}>
                            <Icon size={14} color="white" />
                          </div>
                          <div className={styles["mob-dropdown__text"]}>
                            <p className={styles["mob-dropdown__label"]}>{item.label}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                to={link.href}
                className={styles["mob-nav__link"]}
                onClick={onClose}
              >
                {t(link.label)}
              </Link>
            );
          })}
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
