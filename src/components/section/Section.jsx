import React from "react";
import ParticleBackground from "./ParticleBackground";
import styles from "./Section.module.css";
import BgVideo from '../../assets/videos/8s-payment-gateway.mp4'
import imageSrc from "../../assets/images/hello-1.jpg";
import useReveal from "../../hooks/useReveal";

const Section = ({ children, background = "gradient" }) => {
  const [ref, isVisible] = useReveal();

  return (
    <section
      ref={ref}
      className={`${styles.section} ${styles[background]} ${
        isVisible ? styles.visible : ""
      }`}
    >

      {background === "image" && (
        <div
          className={styles.imageBg}
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      )}

      {background === "particles" && (
        <ParticleBackground
          className={styles.bgLayer}
          count={80}
          speed={0.1}
          lineOpacity={3}
        />
      )}

      {background === "video" && (
        <video autoPlay muted loop className={styles.videoBg}>
          <source src={BgVideo} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div className={styles.overlay}></div>

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>

    </section>
  );
};

export default Section;