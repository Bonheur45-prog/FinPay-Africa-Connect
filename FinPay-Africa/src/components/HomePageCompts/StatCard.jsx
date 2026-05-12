import React, { useEffect, useRef, useState } from 'react';
import styles from './AfricaPresence.module.css';

export default function StatCard({ value, label, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAnimated) return;

    const endValue = parseFloat(value) || 0;
    const duration = 2000;
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(endValue * easeOutCubic);

      setCount(currentValue);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isAnimated, value]);

  return (
    <div className={styles.statCard} ref={cardRef}>
      <div className={styles.statValue}>
        {count}{suffix}
      </div>
      <div className={styles.statLabel}>
        {label}
      </div>
    </div>
  );
}
