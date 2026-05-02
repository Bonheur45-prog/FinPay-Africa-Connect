import React from "react";
import Section from "../section/Section";
import styles from "./SmartDriverCard.module.css";
import SmartDriverCard from "../../assets/images/hello-2.jpg";

const CrossBorderPayments = () => {
  return (
    <Section background="gradient" theme="maroon">
      <div className={styles.wrapper}>

        {/* LEFT VISUAL */}
        <div className={styles.left}>
          <img
            src={SmartDriverCard}
            alt="Cross border payments"
            className={styles.image}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className={styles.right}>
          <h2 className={styles.title}>
            Cross-Border Payments Made Simple
          </h2>

          <p className={styles.description}>
            Enable seamless transfers between diaspora communities and African
            markets with a fast, secure, and cost-effective infrastructure.
          </p>

          <div className={styles.points}>
            <p>✔ Instant international transfers</p>
            <p>✔ Lower transaction costs</p>
            <p>✔ Multi-currency support</p>
            <p>✔ 24/7 availability</p>
          </div>
        </div>

      </div>
    </Section>
  );
};

export default CrossBorderPayments;