/**
 * BlogDetailPage.jsx
 * Single blog article page with comments, media gallery, and related posts
 */

import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Share2,
  Download,
  Print,
  MessageCircle,
  Play,
  X,
} from "lucide-react";
import { useBlogDetail, useBlogComments } from "../hooks/useBlog";
import { MOCK_BLOG_POSTS, CATEGORY_METADATA } from "../constants/blogData";
import styles from "./BlogDetailPage.module.css";

function TableOfContents({ content }) {
  const [isOpen, setIsOpen] = useState(false);

  // Extract headings from markdown-like content
  const headings = content.match(/^## .+$/gm) || [];

  if (headings.length === 0) return null;

  return (
    <div className={styles["toc"]}>
      <button
        className={styles["toc__toggle"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>📑 Table of Contents</span>
        <span className={styles["toc__arrow"]}>
          {isOpen ? "▼" : "▶"}
        </span>
      </button>

      {isOpen && (
        <ul className={styles["toc__list"]}>
          {headings.map((heading, idx) => (
            <li key={idx}>
              <a href={`#section-${idx}`}>
                {heading.replace(/^## /, "")}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MediaGallery({ media }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { t, i18n } = useTranslation("blogs");
  const language = i18n.language || "en";

  if (!media || media.length === 0) return null;

  return (
    <>
      <section className={styles["media-gallery"]}>
        <h3 className={styles["media-gallery__title"]}>
          {t("detail.mediaGallery")}
        </h3>
        <div className={styles["media-grid"]}>
          {media.map((item, idx) => (
            <div
              key={item.id}
              className={styles["media-item"]}
              onClick={() => setSelectedIndex(idx)}
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.caption[language] || "Gallery image"}
                  className={styles["media-item__image"]}
                />
              ) : (
                <div className={styles["media-item__video"]}>
                  <video src={item.url} />
                  <div className={styles["media-item__play"]}>
                    <Play size={32} fill="currentColor" />
                  </div>
                </div>
              )}
              <p className={styles["media-item__caption"]}>
                {item.caption[language]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className={styles["lightbox"]}>
          <button
            className={styles["lightbox__close"]}
            onClick={() => setSelectedIndex(null)}
          >
            <X size={32} />
          </button>

          {media[selectedIndex].type === "image" ? (
            <img
              src={media[selectedIndex].url}
              alt="Full size"
              className={styles["lightbox__image"]}
            />
          ) : (
            <video
              src={media[selectedIndex].url}
              controls
              className={styles["lightbox__video"]}
              autoPlay
            />
          )}

          <div className={styles["lightbox__nav"]}>
            <button
              onClick={() => setSelectedIndex((i) => (i > 0 ? i - 1 : media.length - 1))}
              className={styles["lightbox__nav-btn"]}
            >
              ← Prev
            </button>
            <span className={styles["lightbox__counter"]}>
              {selectedIndex + 1} / {media.length}
            </span>
            <button
              onClick={() => setSelectedIndex((i) => (i < media.length - 1 ? i + 1 : 0))}
              className={styles["lightbox__nav-btn"]}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function CommentSection({ postId }) {
  const { t, i18n } = useTranslation("blogs");
  const language = i18n.language || "en";
  const { comments, addComment, isSubmitting, submitError } = useBlogComments(postId);
  const [formData, setFormData] = useState({
    authorName: "",
    authorEmail: "",
    content: { en: "", fr: "" },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment({
      authorName: formData.authorName,
      authorEmail: formData.authorEmail,
      content: formData.content,
    });
    setFormData({
      authorName: "",
      authorEmail: "",
      content: { en: "", fr: "" },
    });
  };

  return (
    <section className={styles["comments-section"]}>
      <h3 className={styles["comments-section__title"]}>
        <MessageCircle size={20} />
        {t("detail.comments")} ({comments.length})
      </h3>

      {/* Comment Form */}
      <form className={styles["comment-form"]} onSubmit={handleSubmit}>
        <h4 className={styles["comment-form__title"]}>
          {t("detail.leaveComment")}
        </h4>

        <div className={styles["form-group"]}>
          <input
            type="text"
            placeholder={t("detail.commentAuthor")}
            value={formData.authorName}
            onChange={(e) =>
              setFormData({ ...formData, authorName: e.target.value })
            }
            required
            className={styles["form-input"]}
          />
        </div>

        <div className={styles["form-group"]}>
          <input
            type="email"
            placeholder={t("detail.commentEmail")}
            value={formData.authorEmail}
            onChange={(e) =>
              setFormData({ ...formData, authorEmail: e.target.value })
            }
            required
            className={styles["form-input"]}
          />
        </div>

        <div className={styles["form-group"]}>
          <textarea
            placeholder={t("detail.commentPlaceholder")}
            value={formData.content[language]}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: { ...formData.content, [language]: e.target.value },
              })
            }
            required
            rows="4"
            className={styles["form-textarea"]}
          />
        </div>

        {submitError && (
          <p className={styles["form-error"]}>{submitError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles["form-submit"]}
        >
          {isSubmitting ? "Posting..." : t("detail.submitComment")}
        </button>
      </form>

      {/* Comments List */}
      <div className={styles["comments-list"]}>
        {comments.length === 0 ? (
          <p className={styles["no-comments"]}>{t("detail.noComments")}</p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className={styles["comment"]}>
              <div className={styles["comment__header"]}>
                <strong className={styles["comment__author"]}>
                  {comment.authorName}
                </strong>
                <time className={styles["comment__date"]}>
                  {new Date(comment.createdAt).toLocaleDateString(
                    language === "en" ? "en-US" : "fr-FR"
                  )}
                </time>
              </div>
              <p className={styles["comment__text"]}>
                {comment.content[language]}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function RelatedArticles({ relatedPostIds, language, blogBasePath }) {
  const { t } = useTranslation("blogs");

  const relatedPosts = MOCK_BLOG_POSTS.filter((p) =>
    relatedPostIds.includes(p.id)
  ).slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className={styles["related-posts"]}>
      <h3 className={styles["related-posts__title"]}>
        {t("detail.relatedArticles")}
      </h3>

      <div className={styles["related-grid"]}>
        {relatedPosts.map((post) => (
          <article key={post.id} className={styles["related-card"]}>
            <img
              src={post.thumbnail || post.image}
              alt={post.title[language]}
              className={styles["related-card__image"]}
            />
            <div className={styles["related-card__body"]}>
              <p className={styles["related-card__category"]}>
                {t(`categories.${post.category}`)}
              </p>
              <h4 className={styles["related-card__title"]}>
                {post.title[language]}
              </h4>
              <Link to={`${blogBasePath}/${post.slug}`} className={styles["related-card__link"]}>
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BlogDetailPage({ postId }) {
  const { t, i18n } = useTranslation("blogs");
  const { lang } = useParams();
  const blogBasePath = `/${lang || "fr"}/blog`;
  const language = i18n.language || "en";
  const { post, isLoading, error } = useBlogDetail(postId);

  if (isLoading) {
    return (
      <div className={styles["blog-detail"]}>
        <div className={styles["loading"]}>Loading article...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles["blog-detail"]}>
        <div className={styles["error"]}>
          <p>{t("errors.notFound")}</p>
          <Link to={blogBasePath} className={styles["error__link"]}>
            {t("detail.backToBlogs")}
          </Link>
        </div>
      </div>
    );
  }

  const categoryMeta = CATEGORY_METADATA[post.category];

  return (
    <article className={styles["blog-detail"]}>
      {/* Back Link */}
      <Link to={blogBasePath} className={styles["back-link"]}>
        <ArrowLeft size={18} />
        {t("detail.backToBlogs")}
      </Link>

      {/* Header */}
      <header className={styles["blog-header"]}>
        <div className={styles["blog-header__badges"]}>
          <span
            className={styles["badge"]}
            style={{
              backgroundColor: categoryMeta.bg,
              color: categoryMeta.text,
            }}
          >
            {t(`categories.${post.category}`)}
          </span>
          <span className={styles["badge--secondary"]}>
            {post.readTime} {t("card.minutes")}
          </span>
        </div>

        <h1 className={styles["blog-header__title"]}>
          {post.title[language]}
        </h1>

        <div className={styles["blog-header__meta"]}>
          <div className={styles["author-info"]}>
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className={styles["author-avatar"]}
            />
            <div>
              <p className={styles["author-name"]}>
                {t("detail.author", { name: post.author.name })}
              </p>
              <p className={styles["author-role"]}>
                {post.author.role}
              </p>
            </div>
          </div>

          <div className={styles["publish-info"]}>
            <p className={styles["publish-date"]}>
              {t("detail.publishedOn", {
                date: new Date(post.publishedAt).toLocaleDateString(
                  language === "en" ? "en-US" : "fr-FR",
                  { year: "numeric", month: "long", day: "numeric" }
                ),
              })}
            </p>
          </div>
        </div>

        <div className={styles["blog-header__actions"]}>
          <button
            className={styles["action-btn"]}
            onClick={() => {
              const text = `${post.title[language]} - https://yoursite.com/blog/${post.slug}`;
              if (navigator.share) {
                navigator.share({
                  title: post.title[language],
                  text: post.description[language],
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(text);
                alert("Link copied to clipboard!");
              }
            }}
          >
            <Share2 size={18} />
            {t("detail.shareArticle")}
          </button>

          <button
            className={styles["action-btn"]}
            onClick={() => window.print()}
          >
            <Print size={18} />
            {t("detail.printArticle")}
          </button>

          <button
            className={styles["action-btn"]}
            onClick={() => {
              const link = document.createElement("a");
              link.href = "#";
              link.download = `${post.slug}.pdf`;
              link.click();
            }}
          >
            <Download size={18} />
            {t("detail.downloadArticle")}
          </button>
        </div>
      </header>

      {/* Featured Image */}
      <figure className={styles["featured-image"]}>
        <img src={post.image} alt={post.title[language]} />
      </figure>

      {/* Content */}
      <div className={styles["container"]}>
        <div className={styles["content-wrapper"]}>
          {/* Table of Contents */}
          <aside className={styles["sidebar"]}>
            <TableOfContents content={post.content[language]} />
          </aside>

          {/* Main Content */}
          <main className={styles["article-content"]}>
            <div className={styles["article-body"]}>
              {/* Render markdown-like content */}
              {post.content[language].split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("##")) {
                  const title = paragraph.replace(/^## /, "");
                  return (
                    <h2 key={idx} id={`section-${idx}`} className={styles["content-heading"]}>
                      {title}
                    </h2>
                  );
                }
                if (paragraph.startsWith("###")) {
                  const title = paragraph.replace(/^### /, "");
                  return (
                    <h3 key={idx} className={styles["content-subheading"]}>
                      {title}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={idx} className={styles["content-list"]}>
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^- /, "")}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className={styles["content-paragraph"]}>
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Media Gallery */}
            {post.mediaGallery && post.mediaGallery.length > 0 && (
              <MediaGallery media={post.mediaGallery} />
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className={styles["tags"]}>
                <h4 className={styles["tags__title"]}>Tags:</h4>
                <div className={styles["tags__list"]}>
                  {post.tags.map((tag) => (
                    <a key={tag} href={`/${lang || "fr"}/blog?tag=${tag}`} className={styles["tag"]}>
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Comments Section */}
        <CommentSection postId={post.id} />

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <RelatedArticles
            relatedPostIds={post.relatedPosts}
            language={language}
            blogBasePath={blogBasePath}
          />
        )}
      </div>
    </article>
  );
}

export default BlogDetailPage;
