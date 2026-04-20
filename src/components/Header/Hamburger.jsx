import styles from "./Header.module.css";

export default function Hamburger({ open, onToggle }) {
  return (
    <button
      className={`${styles["hamburger"]} ${open ? styles["open"] : ""}`}
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      <div className={styles["ham-box"]}>
        <div className={styles["ham-line"]} />
        <div className={styles["ham-line"]} />
        <div className={styles["ham-line"]} />
      </div>
    </button>
  );
}
