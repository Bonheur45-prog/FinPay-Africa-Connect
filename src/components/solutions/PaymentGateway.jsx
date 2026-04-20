import React from "react";
import Section from "../section/Section";
import PaymentGatewayImage from "../../assets/images/hello-3.jpg";
import styles from "./PaymentGateway.module.css";

const PaymentGateway = () => {
  return (
    <Section background="video">
      <div className={styles.wrapper}>

        {/* LEFT CONTENT */}
        <div className={styles.left}>
          <h2 className={styles.title}>
            Powerful Payment Gateway for Businesses
          </h2>

          <p className={styles.description}>
            Accept payments seamlessly across multiple channels with a secure,
            scalable, and developer-friendly infrastructure built for African markets.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <h4>Multi-channel Payments</h4>
              <p>Accept mobile money, cards, and bank transfers in one system.</p>
            </div>

            <div className={styles.feature}>
              <h4>Fast Integration</h4>
              <p>Simple APIs and tools for quick onboarding and deployment.</p>
            </div>

            <div className={styles.feature}>
              <h4>Real-time Processing</h4>
              <p>Instant confirmations and transaction tracking.</p>
            </div>

            <div className={styles.feature}>
              <h4>Secure Infrastructure</h4>
              <p>Built with modern encryption and compliance standards.</p>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className={styles.right}>
          <img
            src={PaymentGatewayImage}
            alt="Payment Gateway Interface"
            className={styles.image}
          />
        </div>

      </div>
    </Section>
  );
};

export default PaymentGateway;