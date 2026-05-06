import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import blogAPI from "../../services/blogAPI";
import { MOCK_BLOG_POSTS, CATEGORY_METADATA } from "../../features/blog/constants/blogData";
import styles from "./BlogsSection.module.css";

function BlogCard({ post, index, language }) {
  const { t: tBlog } = useTranslation("blogs");
  const { t: tHome } = useTranslation("home");
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

  const badge = CATEGORY_METADATA[post.category] || CATEGORY_METADATA.product;

  return (
    <article
      ref={cardRef}
      className={styles["blog-card"]}
      style={{ "--card-index": index }}
    >
      <div className={styles["blog-card__image-wrap"]}>
        <img
          src={post.coverImage}
          alt={post.title[language]}
          className={styles["blog-card__image"]}
          loading="lazy"
        />
        <div className={styles["blog-card__image-overlay"]} />
        <span
          className={styles["blog-card__badge"]}
          style={{ background: badge.bg, color: badge.text }}
        >
          {tBlog(`categories.${post.category}`)}
        </span>
      </div>

      <div className={styles["blog-card__body"]}>
        <div className={styles["blog-card__meta"]}>
          <span className={styles["blog-card__date"]}>
            {new Date(post.publishedAt).toLocaleDateString(
              language === "fr" ? "fr-FR" : "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            )}
          </span>
          <span className={styles["blog-card__dot"]} aria-hidden="true">
            ·
          </span>
          <span className={styles["blog-card__readtime"]}>
            {post.readingTime} {tBlog("card.minutes")}
          </span>
        </div>

        <h3 className={styles["blog-card__title"]}>
          {post.title[language]}
        </h3>
        <p className={styles["blog-card__desc"]}>
          {post.description[language]}
        </p>

        <Link
          to={`blog/${post.slug}`}
          className={styles["blog-card__link"]}
          aria-label={`Read: ${post.title[language]}`}
        >
          {tHome("latest-insight.blog.blog-post-cta")}
          <ArrowRight className={styles["blog-card__arrow"]} size={16} strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
}

export default function BlogSection() {
  const { t: tHome, i18n } = useTranslation("home");
  const language = i18n.language?.startsWith("fr") ? "fr" : "en";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const response = await blogAPI.getBlogs({
          limit: 6,
          sort: "-publishedAt",
          status: "published",
        });

        if (isMounted) {
          setPosts(response.blogs || []);
        }
      } catch (error) {
        console.error("Failed to load latest blog posts:", error);
        if (isMounted) {
          setPosts([...MOCK_BLOG_POSTS]
            .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
            .slice(0, 6));
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortedPosts = posts.length
    ? [...posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    : [...MOCK_BLOG_POSTS].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <section className={styles["blog-section"]} aria-labelledby="blog-heading">
      <div className={`${styles["blog-section__blob"]} ${styles["blog-section__blob--1"]}`} aria-hidden="true" />
      <div className={`${styles["blog-section__blob"]} ${styles["blog-section__blob--2"]}`} aria-hidden="true" />
      <div className={`${styles["blog-section__blob"]} ${styles["blog-section__blob--3"]}`} aria-hidden="true" />

      <div className={styles["blog-section__container"]}>
        <header className={styles["blog-section__header"]}>
          <span className={styles["blog-section__eyebrow"]}>{tHome("latest-insight.label")}</span>
          <h2 className={styles["blog-section__heading"]} id="blog-heading">
            {tHome("latest-insight.title1")}&nbsp;{tHome("latest-insight.title2")}
          </h2>
          <p className={styles["blog-section__subheading"]}>
            {tHome("latest-insight.descriptions")}
          </p>
        </header>

        <div className={styles["blog-section__grid"]}>
          {sortedPosts.slice(0, 6).map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} language={language} />
          ))}
        </div>

        <div className={styles["blog-section__cta-wrap"]}>
          <Link to="blog" className={styles["blog-section__cta"]}>
            {tHome("latest-insight.blog-section-cta")}
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}