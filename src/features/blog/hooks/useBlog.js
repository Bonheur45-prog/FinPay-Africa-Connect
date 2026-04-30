/**
 * Custom Hooks for Blog Module
 * Handles data fetching, filtering, pagination, and state management
 */

import { useState, useCallback, useEffect } from "react";
import { MOCK_BLOG_POSTS } from "../constants/blogData";

/**
 * useBlogListing
 * Manages blog listing state: filtering, sorting, pagination, search
 */
export const useBlogListing = (initialPosts = MOCK_BLOG_POSTS, postsPerPage = 6) => {
  const [allPosts, setAllPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter and sort posts
  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);

    try {
      let result = [...allPosts];

      // Filter by category
      if (selectedCategory !== "all") {
        result = result.filter((post) => post.category === selectedCategory);
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          (post) =>
            post.title.en.toLowerCase().includes(query) ||
            post.title.fr.toLowerCase().includes(query) ||
            post.description.en.toLowerCase().includes(query) ||
            post.description.fr.toLowerCase().includes(query) ||
            post.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      // Sort posts
      result.sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          case "oldest":
            return new Date(a.publishedAt) - new Date(b.publishedAt);
          case "popular":
            return (b.comments?.length || 0) - (a.comments?.length || 0);
          default:
            return 0;
        }
      });

      setFilteredPosts(result);
      setError(null);
    } catch (err) {
      setError("Error filtering posts");
      console.error("Filter error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery, sortBy, allPosts]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const goToPage = useCallback((page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [totalPages]);

  return {
    posts: paginatedPosts,
    allFilteredPosts: filteredPosts,
    totalPosts: filteredPosts.length,
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
    setAllPosts,
  };
};

/**
 * useBlogDetail
 * Fetches and manages a single blog post by slug or ID
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

        const foundPost = MOCK_BLOG_POSTS.find((p) => p.id === postId || p.slug === postId);

        if (!foundPost) {
          throw new Error("Post not found");
        }

        setPost(foundPost);

        if (foundPost.relatedPosts && foundPost.relatedPosts.length > 0) {
          const related = MOCK_BLOG_POSTS.filter((p) =>
            foundPost.relatedPosts.includes(p.id)
          );
          setRelatedPosts(related);
        }

        setError(null);
      } catch (err) {
        setError(err.message || "Error loading post");
        console.error("Error fetching post:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  return { post, relatedPosts, isLoading, error };
};

/**
 * useBlogComments
 * Manages blog post comments
 */
export const useBlogComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const post = MOCK_BLOG_POSTS.find((p) => p.id === postId);
    if (post && post.comments) {
      setComments(post.comments);
    }
  }, [postId]);

  const addComment = useCallback(async (commentData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const newComment = {
        id: comments.length + 1,
        authorName: commentData.authorName,
        authorEmail: commentData.authorEmail,
        content: commentData.content,
        createdAt: new Date().toISOString().split("T")[0],
        replies: [],
      };

      setComments([...comments, newComment]);
      return newComment;
    } catch (err) {
      setSubmitError("Error submitting comment");
      console.error("Comment error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [comments]);

  return { comments, addComment, isSubmitting, submitError };
};

/**
 * useBlogSearch
 * Dedicated search functionality with debouncing
 */
export const useBlogSearch = (posts, debounceDelay = 300) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(posts);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === "") {
        setResults(posts);
      } else {
        setIsSearching(true);
        const query_lower = query.toLowerCase();
        const filtered = posts.filter(
          (post) =>
            post.title.en.toLowerCase().includes(query_lower) ||
            post.title.fr.toLowerCase().includes(query_lower) ||
            post.description.en.toLowerCase().includes(query_lower) ||
            post.description.fr.toLowerCase().includes(query_lower) ||
            post.tags.some((tag) => tag.toLowerCase().includes(query_lower))
        );
        setResults(filtered);
        setIsSearching(false);
      }
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [query, posts, debounceDelay]);

  return { query, setQuery, results, isSearching };
};

/**
 * useBlogStats
 * Get blog statistics for dashboard
 */
export const useBlogStats = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    postsByCategory: {},
    recentPosts: [],
  });

  useEffect(() => {
    const totalPosts = MOCK_BLOG_POSTS.length;
    const totalComments = MOCK_BLOG_POSTS.reduce(
      (acc, post) => acc + (post.comments?.length || 0),
      0
    );

    const postsByCategory = {};
    MOCK_BLOG_POSTS.forEach((post) => {
      postsByCategory[post.category] = (postsByCategory[post.category] || 0) + 1;
    });

    const recentPosts = [...MOCK_BLOG_POSTS]
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 5);

    setStats({
      totalPosts,
      totalComments,
      postsByCategory,
      recentPosts,
    });
  }, []);

  return stats;
};

/**
 * useBlogMediaUpload
 * Handles media uploads (images, videos)
 */
export const useBlogMediaUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMedia = useCallback(async (file) => {
    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadProgress(0);

      const validTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"];
      if (!validTypes.includes(file.type)) {
        throw new Error("Invalid file type");
      }

      const sizeLimit = file.type.startsWith("video") ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > sizeLimit) {
        throw new Error("File size exceeds limit");
      }

      return await new Promise((resolve) => {
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress(i);
        }
        resolve({ url: URL.createObjectURL(file), name: file.name });
      });
    } catch (err) {
      setUploadError(err.message || "Upload failed");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { isUploading, uploadError, uploadProgress, uploadMedia };
};
