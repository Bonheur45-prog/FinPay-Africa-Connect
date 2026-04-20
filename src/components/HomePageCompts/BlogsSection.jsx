import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import styles from "./BlogsSection.module.css";

const BLOG_POSTS = [
  { id: 1, category: "product", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", readTime: "5 min read", date: "Jun 12, 2025", href: "#" },
  { id: 2, category: "engineering", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80", readTime: "8 min read", date: "May 28, 2025", href: "#" },
  { id: 3, category: "growth", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", readTime: "6 min read", date: "May 14, 2025", href: "#" },
  { id: 4, category: "security", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80", readTime: "7 min read", date: "Apr 30, 2025", href: "#" },
  { id: 5, category: "design", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", readTime: "4 min read", date: "Apr 18, 2025", href: "#" },
  { id: 6, category: "culture", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", readTime: "5 min read", date: "Apr 5, 2025", href: "#" },
];

const CATEGORY_COLORS = {
  Product:     { bg: "#8C1A13", text: "#fff" },
  Engineering: { bg: "#0f172a", text: "#fff" },
  Growth:      { bg: "#065f46", text: "#fff" },
  Security:    { bg: "#7c2d12", text: "#fff" },
  Design:      { bg: "#4c1d95", text: "#fff" },
  Culture:     { bg: "#1e3a5f", text: "#fff" },
};

function BlogCard({ post, index }) {
  const { t } = useTranslation("home");
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add(styles["blog-card--visible"]);
          }, index * 110);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const badge = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.Product;

  return (
    <article ref={cardRef} className={styles["blog-card"]} style={{ "--card-index": index }}>
      <div className={styles["blog-card__image-wrap"]}>
        <img src={post.image} alt={post.title} className={styles["blog-card__image"]} loading="lazy" />
        <div className={styles["blog-card__image-overlay"]} />
        <span className={styles["blog-card__badge"]} style={{ background: badge.bg, color: badge.text }}>
          {t(`latest-insight.blog.categories.${post.category}`)}
        </span>
      </div>

      <div className={styles["blog-card__body"]}>
        <div className={styles["blog-card__meta"]}>
          <span className={styles["blog-card__date"]}>{post.date}</span>
          <span className={styles["blog-card__dot"]} aria-hidden="true">·</span>
          <span className={styles["blog-card__readtime"]}>{post.readTime}</span>
        </div>

        <h3 className={styles["blog-card__title"]}>{t(`latest-insight.blog.posts.p${post.id}.title`)}</h3>
        <p className={styles["blog-card__desc"]}>{t(`latest-insight.blog.posts.p${post.id}.desc`)}</p>

        <a href={post.href} className={styles["blog-card__link"]} aria-label={`Read: ${post.title}`}>
          {t("latest-insight.blog.blog-post-cta")}
          <ArrowRight className={styles["blog-card__arrow"]} size={16} strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}

export default function BlogSection() {
  const { t } = useTranslation("home");

  return (
    <section className={styles["blog-section"]} aria-labelledby="blog-heading">
      <div className={`${styles["blog-section__blob"]} ${styles["blog-section__blob--1"]}`} aria-hidden="true" />
      <div className={`${styles["blog-section__blob"]} ${styles["blog-section__blob--2"]}`} aria-hidden="true" />
      <div className={`${styles["blog-section__blob"]} ${styles["blog-section__blob--3"]}`} aria-hidden="true" />

      <div className={styles["blog-section__container"]}>
        <header className={styles["blog-section__header"]}>
          <span className={styles["blog-section__eyebrow"]}>{t("latest-insight.label")}</span>
          <h2 className={styles["blog-section__heading"]} id="blog-heading">
            {t("latest-insight.title1")}&nbsp;{t("latest-insight.title2")}
          </h2>
          <p className={styles["blog-section__subheading"]}>
            {t("latest-insight.descriptions")}
          </p>
        </header>

        <div className={styles["blog-section__grid"]}>
          {BLOG_POSTS.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        <div className={styles["blog-section__cta-wrap"]}>
          <a href="#" className={styles["blog-section__cta"]}>
            {t("latest-insight.blog-section-cta")}
            <ArrowRight size={18} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}