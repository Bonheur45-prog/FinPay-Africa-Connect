import React from "react";
import Section from "../section/Section";
import styles from "./MobileMoneyCards.module.css";

export default function MobileMoneyCards() {
  return (
    <Section background="particles" theme="maroon">
        <div className={`${styles.wrapper} ${styles.container}`}>
    
    {/* Header */}
    <div className={styles.header}>
        <h2 className={styles.title}>
        Send & Receive Money Across Borders
        </h2>
        <p className={styles.subtitle}>
        Seamlessly connect mobile wallets, banks, and cards — all in one platform.
        </p>
    </div>

    {/* Cards */}
    <div className={styles.grid}>
        <div className={`${styles.card} ${styles.glass}`}>
        <h3>Mobile Money</h3>
        <p>Integrate with local wallets like M-Pesa, Airtel Money, and more.</p>
        </div>

        <div className={`${styles.card} ${styles.glass}`}>
        <h3>Bank Transfers</h3>
        <p>Direct connections with regional and international banking networks.</p>
        </div>

        <div className={`${styles.card} ${styles.glass}`}>
        <h3>Card Payments</h3>
        <p>Accept and send payments using Visa, Mastercard, and virtual cards.</p>
        </div>
    </div>

    {/* How it works */}
    <div className={styles.steps}>
        <div className={styles.step}>
        <span>01</span>
        <p>Connect your payment channels</p>
        </div>
        <div className={styles.step}>
        <span>02</span>
        <p>Route transactions intelligently</p>
        </div>
        <div className={styles.step}>
        <span>03</span>
        <p>Settle instantly across borders</p>
        </div>
    </div>

    </div>
    </Section>
      
  );
}