import { useEffect, useRef, useState } from 'react';

/**
 * FinPay Africa — useScrollReveal
 * A lightweight Intersection Observer hook for scroll-triggered animations.
 * Shared utility — no styles, no conflicts.
 *
 * @param {Object} options
 * @param {number} options.threshold - 0 to 1, how much of the element must be visible
 * @param {string} options.rootMargin - IntersectionObserver rootMargin
 * @param {boolean} options.once - if true, stop observing after first reveal
 * @returns {{ ref, isVisible }}
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * useCountUp — animates a number from 0 to target when triggered
 * @param {number} target - final number
 * @param {number} duration - animation duration in ms
 * @param {boolean} start - trigger flag
 * @returns {number} current count
 */
export function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, target, duration]);

  return count;
}
