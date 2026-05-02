import React from "react";
import ParticleBackground from "./ParticleBackground";
import styles from "./Section.module.css";
import BgVideo from '../../assets/videos/8s-payment-gateway.mp4'
import imageSrc from "../../assets/images/hello-1.jpg";
import useReveal from "../../hooks/useReveal";

const Section = ({ children, background = "gradient", theme = "navy" }) => {
  const [ref, isVisible] = useReveal();

  // Helper to get themed class names
  const getThemedClass = (baseClass) => {
    if (theme === "maroon") {
      const maroonClass = `maroon${baseClass.charAt(0).toUpperCase() + baseClass.slice(1)}`;
      return styles[maroonClass] || styles[baseClass];
    }
    return styles[baseClass];
  };

  return (
    <section
      ref={ref}
      className={`${styles.section} ${getThemedClass(background)} ${
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
      <div className={getThemedClass("overlay")}></div>

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>

    </section>
  );
};

export default Section;