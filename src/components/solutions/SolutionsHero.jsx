import React from "react";
import Section from "../section/Section";
import SolutionHeroImage from "../../assets/images/physical-virtual-card.png";
import styles from "./SolutionsHero.module.css";

const SolutionsHero = () => {
  return (
    <Section background="particles">
      <div className={styles.heroWrapper}>
        
        {/* LEFT CONTENT */}
        <div className={styles.left}>
          <h1 className={styles.title}>
            Digital Payment Solutions Built for Africa
          </h1>

          <p className={styles.subtitle}>
            FinPay Africa provides scalable, secure, and modern financial
            infrastructure designed to power banks, businesses, and cross-border
            transactions across the continent.
          </p>

          <div className={styles.points}>
            <p>✔ Cross-border money transfers</p>
            <p>✔ Payment gateway for merchants</p>
            <p>✔ Card issuing & mobile money integration</p>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className={styles.right}>
          <img
            src={SolutionHeroImage}
            alt="FinPay platform preview"
            className={styles.image}
          />
        </div>

      </div>
    </Section>
  );
};

export default SolutionsHero;