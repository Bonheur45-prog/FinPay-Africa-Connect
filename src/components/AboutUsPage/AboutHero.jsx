import { useEffect, useRef, useState } from "react";
import styles from './AboutHero.module.css';

export default function AboutHero() {
  const heroRef = useRef(null);
  const [videoReady, setVideoReady] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles["ah-visible"]);
        }
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles["ah-section"]} ref={heroRef}>
      <video
        className={`${styles["ah-bg-video"]} ${videoReady ? "" : styles["ah-bg-video-hidden"]}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80"
        onError={() => setVideoReady(false)}
      >
        <source
          src="https://v.ftcdn.net/05/18/80/46/240_F_518804629_5Gr3o8p1OVPYGSdWJEZMYFwVVsocU3sg_ST.mp4"
          type="video/mp4"
        />
      </video>

      {/* Animated background layers */}
      <div className={`${styles["ah-bg-layer"]} ${styles["ah-bg-1"]}`} />
      <div className={`${styles["ah-bg-layer"]} ${styles["ah-bg-2"]}`} />
      <div className={`${styles["ah-bg-layer"]} ${styles["ah-bg-3"]}`} />
      <div className={styles["ah-grid-overlay"]} />
      <div className={styles["ah-noise"]} />

      {/* Floating orbs */}
      <div className={`${styles["ah-orb"]} ${styles["ah-orb-1"]}`} />
      <div className={`${styles["ah-orb"]} ${styles["ah-orb-2"]}`} />
      <div className={`${styles["ah-orb"]} ${styles["ah-orb-3"]}`} />

      <div className={styles["ah-content"]}>
        <div className={styles["ah-badge"]}>
          <span className={styles["ah-badge-dot"]} />
          FinPay Africa
        </div>

        <h1 className={styles["ah-title"]}>
          <span className={`${styles["ah-title-line"]} ${styles["ah-line-1"]}`}>Who We Are</span>
          <span className={`${styles["ah-title-line"]} ${styles["ah-line-2"]}`}>& What We Stand For</span>
        </h1>

        <p className={styles["ah-subtitle"]}>
          A trusted enterprise technology partner building secure, scalable digital
          infrastructure for Africa's financial institutions — rooted in Rwanda,
          reaching the continent.
        </p>

        <div className={styles["ah-divider"]}>
          <span className={styles["ah-divider-line"]} />
          <span className={styles["ah-divider-dot"]} />
          <span className={styles["ah-divider-line"]} />
        </div>
      </div>

      <div className={styles["ah-scroll-indicator"]}>
        <div className={styles["ah-scroll-line"]} />
        <span>Scroll To Explore</span>
      </div>
    </section>
  );
}
