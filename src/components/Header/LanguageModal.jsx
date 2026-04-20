import styles from "./Header.module.css";
import { LANGUAGES } from "./constants";

export default function LanguageModal({ open, onSelect, selected }) {
  return (
    <div className={`${styles["lang-modal"]} ${open ? styles["open"] : ""}`}>
      <div className={styles["lang-modal__inner"]}>
        <h3 className={styles["lang-modal__title"]}>Select Language</h3>
        <div className={styles["lang-list"]}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`${styles["lang-option"]} ${selected === lang.code ? styles["selected"] : ""}`}
              onClick={() => onSelect(lang.code)}
            >
              <span className={styles["lang-flag"]}>{lang.flag}</span>
              <span className={styles["lang-name"]}>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
