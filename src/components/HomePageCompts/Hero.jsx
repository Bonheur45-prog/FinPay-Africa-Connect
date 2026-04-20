import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import styles from "./Hero.module.css";

const SLIDES = [
  { url: "https://t4.ftcdn.net/jpg/08/91/95/01/240_F_891950192_dTTsjRwAr5lqc6JxfSVRAK8iPrTQ9eLX.jpg", alt: "Digital financial charts" },
  { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1800&q=80", alt: "Mobile payment experience" },
  { url: "https://t3.ftcdn.net/jpg/06/24/98/34/240_F_624983474_S5qLmHCtXxdyv73xzaxZ5ClzYKoQpWXa.jpg", alt: "Fintech infrastructure" },
  { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1800&q=80", alt: "African business professionals" },
];

const SLIDE_INTERVAL = 5000;

const pad = (n) => String(n + 1).padStart(2, "0");

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      <path d="M6 5.5l5 2.5-5 2.5V5.5z" fill="white" />
    </svg>
  );
}

export function Hero() {
  const { t } = useTranslation("home");
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => setCurrent((prev) => (prev + 1) % SLIDES.length), []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, SLIDE_INTERVAL);
  }, [advance]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  useEffect(() => {
    if (paused) {
      clearInterval(timerRef.current);
    } else {
      startTimer();
    }
  }, [paused, startTimer]);

  const goTo = (idx) => {
    setCurrent(idx);
    startTimer();
  };

  return (
    <section
      className={styles["hero"]}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero section"
    >
      <div className={styles["hero__slides"]} aria-hidden="true">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`${styles["hero__slide"]} ${i === current ? styles["active"] : ""}`}
            style={{ backgroundImage: `url('${slide.url}')` }}
            role="img"
            aria-label={slide.alt}
          />
        ))}
      </div>

      <div className={styles["hero__overlay"]} aria-hidden="true" />
      <div className={styles["hero__grain"]} aria-hidden="true" />

      <div className={styles["hero__content"]}>
        <div className={styles["hero__badge"]}>
          <span className={styles["hero__badge-dot"]} />
          {t("hello.hellobadge")}
        </div>

        <div className={styles["hero__eyebrow"]}>
          <span className={styles["hero__eyebrow-line"]} />
          {t("hello.eyebrow")}
        </div>

        <h1 className={styles["hero__headline"]}>
          {t("hello.line1")} <em>{t("hello.emphasis")}</em>
          <br />{t("hello.line2")}
          <br />{t("hello.line3")}
        </h1>

        <p className={styles["hero__desc"]}>
          {t("hello.paragraph")}
        </p>

        <div className={styles["hero__actions"]}>
          <a href="#solutions" className={styles["hero__btn-primary"]}>
            {t("hello.buttons.explore")}{" "}
            <i className={styles["arrow-icon"]} aria-hidden="true">→</i>
          </a>
          <a href="#demo" className={styles["hero__btn-secondary"]}>
            <PlayIcon />
            {t("hello.buttons.demo")}
          </a>
        </div>
      </div>

      <div className={styles["hero__indicators"]} role="tablist" aria-label="Slide navigation">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles["hero__dot"]} ${i === current ? styles["active"] : ""}`}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className={styles["hero__counter"]} aria-hidden="true">
        <strong>{pad(current)}</strong> / {pad(SLIDES.length - 1)}
      </div>

      <div className={styles["hero__scroll"]} aria-hidden="true">
        <div className={styles["hero__scroll-mouse"]}>
          <div className={styles["hero__scroll-dot"]} />
        </div>
        <span className={styles["hero__scroll-label"]}>Scroll</span>
      </div>
    </section>
  );
}
