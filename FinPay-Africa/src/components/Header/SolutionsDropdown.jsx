import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import styles from "./Header.module.css";

export default function SolutionsDropdown({ href, open, onToggle, items }) {
  return (
    <div
      className={`${styles["nav__item"]} ${styles["nav__item--dropdown"]} ${open ? styles["open"] : ""}`}
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <Link
        to={href}
        className={`${styles["nav__link"]} ${styles["nav__link--dropdown"]}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Solutions
        <ChevronDown
          className={`${styles["nav__caret"]} ${open ? styles["open"] : ""}`}
          size={14}
          strokeWidth={2}
          aria-hidden="true"
        />
      </Link>

      <div className={styles["solutions-dropdown"]} role="menu" aria-label="Solutions menu">
        <div className={styles["solutions-dropdown__grid"]}>
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link key={item.href} to={item.href} className={styles["solution-item"]} role="menuitem">
                <div className={styles["solution-item__icon-wrapper"]} style={{ "--icon-delay": `${index * 0.08}s`, "--icon-bg": item.bgColor }}>
                  {IconComponent ? (
                    <div className={styles["solution-item__icon-bg"]}>
                      <IconComponent size={24} color="white" strokeWidth={2} />
                    </div>
                  ) : item.image ? (
                    <div className={styles["solution-item__image"]}>
                      <img src={item.image} alt="" />
                    </div>
                  ) : null}
                </div>
                <div className={styles["solution-item__content"]}>
                  <div className={styles["solution-item__title"]}>{item.label}</div>
                  <div className={styles["solution-item__desc"]}>{item.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
