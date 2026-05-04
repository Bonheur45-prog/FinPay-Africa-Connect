/**
 * Custom Hooks for Blog Module
 */

import { useState, useCallback, useEffect } from "react";
import blogAPI from "../../../services/blogAPI";

/**
 * useBlogListing
 */
export const useBlogListing = (postsPerPage = 6) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = {
        page: currentPage,
        limit: postsPerPage,
        status: "published",
      };

      if (selectedCategory !== "all") {
        params.category = selectedCategory;
      }

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const sortMapping = {
        newest: "-publishedAt",
        oldest: "publishedAt",
        popular: "-views",
      };

      params.sort = sortMapping[sortBy] || "-publishedAt";

      const response = await blogAPI.getBlogs(params);

      setPosts(response.blogs || []);
      setTotalPosts(response.pagination?.total || 0);
      setTotalPages(response.pagination?.pages || 0);
    } catch (err) {
      setError(err.message || "Failed to fetch blogs");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, selectedCategory, searchQuery, sortBy, postsPerPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return {
    posts,
    totalPosts,
    currentPage,
    totalPages,
    goToPage,
    selectedCategory,
    setSelectedCategory,
    setCategory: setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setSearch: setSearchQuery,
    sortBy,
    setSortBy,
    setSorting: setSortBy,
    isLoading,
    error,
    refetch: fetchPosts,
  };
};

/**
 * useBlogDetail
 */
export const useBlogDetail = (postId) => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const blogPost = await blogAPI.getBlogBySlug(postId);
        setPost(blogPost);

        if (blogPost?.category) {
          const res = await blogAPI.getBlogs({
            category: blogPost.category,
            limit: 4,
            status: "published",
          });

          const filtered = res.blogs.filter(
            (p) => p.slug !== blogPost.slug
          );

          setRelatedPosts(filtered.slice(0, 3));
        }
      } catch (err) {
        setError(err.message || "Failed to fetch blog");
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  return { post, relatedPosts, isLoading, error };
};

/**
 * useBlogComments - Stub implementation (comments not yet implemented in backend)
 */
export const useBlogComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const addComment = useCallback(async (commentData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // TODO: Implement comment API when backend supports it
      console.log('Comment submission not yet implemented:', commentData);

      // For now, just simulate success
      setTimeout(() => {
        setComments(prev => [...prev, {
          id: Date.now(),
          ...commentData,
          createdAt: new Date().toISOString(),
          status: 'pending' // Comments would need admin approval
        }]);
        setIsSubmitting(false);
      }, 1000);

    } catch (err) {
      setSubmitError(err.message || 'Failed to submit comment');
      setIsSubmitting(false);
    }
  }, []);

  return {
    comments,
    addComment,
    isSubmitting,
    submitError,
  };
};