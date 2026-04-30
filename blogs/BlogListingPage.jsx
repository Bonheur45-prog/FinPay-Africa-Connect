/**
 * BlogListingPage.jsx
 * Main blog listing page with search, filtering, pagination, and featured articles
 */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import {
  Search,
  Filter,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useBlogListing } from "../hooks/useBlog";
import { CATEGORY_METADATA, MOCK_BLOG_POSTS } from "../constants/blogData";
import styles from "./BlogListingPage.module.css";

function FeaturedBlogCard({ post, language, blogBasePath }) {
  const { t } = useTranslation("blogs");

  return (
    <article className={styles["featured-card"]}>
      <div className={styles["featured-card__image"]}>
        <img src={post.image} alt={post.title[language]} loading="lazy" />
        <div className={styles["featured-card__overlay"]} />
        <div className={styles["featured-card__badge"]}>
          {t("listing.featured")}
        </div>
      </div>

      <div className={styles["featured-card__content"]}>
        <span className={styles["featured-card__category"]}>
          {t(`categories.${post.category}`)}
        </span>
        <h2 className={styles["featured-card__title"]}>
          {post.title[language]}
        </h2>
        <p className={styles["featured-card__desc"]}>
          {post.description[language]}
        </p>

        <div className={styles["featured-card__meta"]}>
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className={styles["featured-card__author-avatar"]}
          />
          <div>
            <p className={styles["featured-card__author-name"]}>
              {post.author.name}
            </p>
            <p className={styles["featured-card__author-role"]}>
              {post.author.role}
            </p>
          </div>
        </div>

        <div className={styles["featured-card__footer"]}>
          <span className={styles["featured-card__date"]}>
            {new Date(post.publishedAt).toLocaleDateString(
              language === "en" ? "en-US" : "fr-FR"
            )}
          </span>
          <Link to={`${blogBasePath}/${post.slug}`} className={styles["featured-card__link"]}>
            {t("card.readArticle")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function BlogCardGrid({ post, language, index, blogBasePath }) {
  const { t } = useTranslation("blogs");
  const categoryMeta = CATEGORY_METADATA[post.category];

  return (
    <article
      className={styles["blog-card"]}
      style={{ "--card-index": index }}
    >
      <div className={styles["blog-card__image-wrap"]}>
        <img
          src={post.thumbnail || post.image}
          alt={post.title[language]}
          className={styles["blog-card__image"]}
          loading="lazy"
        />
        <div className={styles["blog-card__overlay"]} />
        <span
          className={styles["blog-card__category-badge"]}
          style={{
            backgroundColor: categoryMeta.bg,
            color: categoryMeta.text,
          }}
        >
          {t(`categories.${post.category}`)}
        </span>
      </div>

      <div className={styles["blog-card__body"]}>
        <div className={styles["blog-card__meta"]}>
          <span className={styles["blog-card__date"]}>
            {new Date(post.publishedAt).toLocaleDateString(
              language === "en" ? "en-US" : "fr-FR"
            )}
          </span>
          <span className={styles["blog-card__separator"]}>·</span>
          <span className={styles["blog-card__read-time"]}>
            {post.readTime} {t("card.minutes")}
          </span>
        </div>

        <h3 className={styles["blog-card__title"]}>
          {post.title[language]}
        </h3>
        <p className={styles["blog-card__description"]}>
          {post.description[language]}
        </p>

        <Link
          to={`${blogBasePath}/${post.slug}`}
          className={styles["blog-card__read-more"]}
        >
          {t("card.readArticle")}
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function BlogListingPage() {
  const { t, i18n } = useTranslation("blogs");
  const { lang } = useParams();
  const language = i18n.language || "en";
  const blogBasePath = `/${lang || "fr"}/blog`;

  const {
    posts,
    allFilteredPosts,
    totalPosts,
    currentPage,
    totalPages,
    goToPage,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    isLoading,
    error,
  } = useBlogListing(MOCK_BLOG_POSTS, 6);

  const featuredPosts = MOCK_BLOG_POSTS.filter((p) => p.featured).slice(0, 1);

  const categories = [
    { id: "all", label: t("listing.filterAll") },
    { id: "product", label: t("categories.product") },
    { id: "engineering", label: t("categories.engineering") },
    { id: "growth", label: t("categories.growth") },
    { id: "security", label: t("categories.security") },
    { id: "design", label: t("categories.design") },
    { id: "culture", label: t("categories.culture") },
  ];

  return (
    <div className={styles["blog-listing"]}>
      {/* Header */}
      <section className={styles["blog-listing__header"]}>
        <div className={styles["header__content"]}>
          <h1 className={styles["header__title"]}>
            {t("listing.title")}
          </h1>
          <p className={styles["header__subtitle"]}>
            {t("listing.subtitle")}
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className={styles["featured-section"]}>
          <div className={styles["featured-section__container"]}>
            {featuredPosts.map((post) => (
              <FeaturedBlogCard
                key={post.id}
                post={post}
                language={language}
                blogBasePath={blogBasePath}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className={styles["blog-listing__main"]}>
        <div className={styles["container"]}>
          {/* Controls */}
          <div className={styles["controls"]}>
            {/* Search */}
            <div className={styles["search-box"]}>
              <Search className={styles["search-box__icon"]} size={20} />
              <input
                type="text"
                placeholder={t("listing.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles["search-box__input"]}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={styles["search-box__clear"]}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filters & Sort */}
            <div className={styles["filters"]}>
              <div className={styles["filter-group"]}>
                <label className={styles["filter-label"]}>
                  <Filter size={16} />
                  {t("listing.filterLabel")}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles["filter-select"]}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles["filter-group"]}>
                <label className={styles["filter-label"]}>
                  <TrendingUp size={16} />
                  {t("listing.sortLabel")}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles["filter-select"]}
                >
                  <option value="newest">{t("listing.sortNewest")}</option>
                  <option value="oldest">{t("listing.sortOldest")}</option>
                  <option value="popular">{t("listing.sortPopular")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className={styles["results-info"]}>
            <p>
              {totalPosts} {t("listing.resultsFound")}
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className={styles["error-state"]}>
              <p className={styles["error-state__message"]}>{error}</p>
              <button className={styles["error-state__retry"]}>
                {t("errors.tryAgain")}
              </button>
            </div>
          )}

          {/* No Results */}
          {!isLoading && totalPosts === 0 && (
            <div className={styles["empty-state"]}>
              <div className={styles["empty-state__icon"]}>📝</div>
              <h3 className={styles["empty-state__title"]}>
                {t("empty.noSearchResults")}
              </h3>
              <p className={styles["empty-state__text"]}>
                {t("empty.tryOtherKeywords")}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className={styles["empty-state__reset"]}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Blog Grid */}
          {!isLoading && totalPosts > 0 && (
            <>
              <div className={styles["blog-grid"]}>
                {posts.map((post, index) => (
                  <BlogCardGrid
                    key={post.id}
                    post={post}
                    language={language}
                    index={index}
                    blogBasePath={blogBasePath}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles["pagination"]}>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles["pagination__button"]}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={20} />
                    {t("listing.pagination.previous")}
                  </button>

                  <div className={styles["pagination__info"]}>
                    {t("listing.pagination.pageOf", {
                      current: currentPage,
                      total: totalPages,
                    })}
                  </div>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles["pagination__button"]}
                    aria-label="Next page"
                  >
                    {t("listing.pagination.next")}
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}

          {isLoading && (
            <div className={styles["loading-state"]}>
              <div className={styles["loading-spinner"]} />
              <p>Loading articles...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogListingPage;
