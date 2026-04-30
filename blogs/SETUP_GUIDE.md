/**
 * BLOG MODULE - COMPLETE SETUP & INTEGRATION GUIDE
 * 
 * This document explains how to integrate the new professional blog module
 * into your existing fintech website project.
 */

// ═════════════════════════════════════════════════════════════════════════════
// 📁 PROJECT STRUCTURE
// ═════════════════════════════════════════════════════════════════════════════

/*
Your new blog module should be organized as follows in your project:

src/
├── features/
│   └── blog/
│       ├── components/
│       │   ├── BlogCard.jsx                    (reusable card component)
│       │   ├── MediaGallery.jsx               (media gallery & lightbox)
│       │   ├── CommentSection.jsx             (comments & form)
│       │   └── RelatedArticles.jsx            (related posts)
│       │
│       ├── pages/
│       │   ├── BlogListingPage.jsx            (main blog listing page)
│       │   └── BlogDetailPage.jsx             (single article page)
│       │
│       ├── hooks/
│       │   └── useBlog.js                     (custom React hooks for blog)
│       │
│       ├── constants/
│       │   ├── blogData.js                    (mock data & API structure)
│       │   └── translations.js                (i18n translations)
│       │
│       ├── styles/
│       │   ├── BlogListingPage.module.css     (listing page styles)
│       │   └── BlogDetailPage.module.css      (detail page styles)
│       │
│       └── README.md                          (this file)
│
└── App.jsx or Router configuration (see Step 3)
*/

// ═════════════════════════════════════════════════════════════════════════════
// 🚀 STEP 1: INSTALL DEPENDENCIES
// ═════════════════════════════════════════════════════════════════════════════

/*
Make sure you have the following dependencies in your project:

Already installed (likely):
- react & react-dom
- react-router-dom (for navigation)
- lucide-react (for icons)
- react-i18next & i18next (for bilingual support)

If not installed yet, run:
npm install react-i18next i18next

For optional features:
npm install axios              # For API calls
npm install react-markdown     # For rendering markdown content
npm install react-helmet       # For SEO meta tags
*/

// ═════════════════════════════════════════════════════════════════════════════
// 🔧 STEP 2: SET UP i18n (BILINGUAL SUPPORT)
// ═════════════════════════════════════════════════════════════════════════════

/*
If you don't already have i18n configured, create a file:
src/i18n/config.js
*/

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { blogTranslations } from '../features/blog/constants/translations';

// Import your existing translations if any
import enHome from '../locales/en/home.json';
import frHome from '../locales/fr/home.json';

const resources = {
  en: {
    home: enHome,
    blogs: blogTranslations.en.blogs,
  },
  fr: {
    home: frHome,
    blogs: blogTranslations.fr.blogs,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;

// Then in your main.jsx or index.jsx, import this config:
// import './i18n/config';

// ═════════════════════════════════════════════════════════════════════════════
// 📍 STEP 3: ADD ROUTES TO YOUR ROUTER
// ═════════════════════════════════════════════════════════════════════════════

/*
In your React Router configuration, add these routes:

Option A: If using React Router v6 with createBrowserRouter
*/

import { createBrowserRouter } from 'react-router-dom';
import BlogListingPage from '@/features/blog/pages/BlogListingPage';
import BlogDetailPage from '@/features/blog/pages/BlogDetailPage';

const router = createBrowserRouter([
  // ... your existing routes ...
  
  {
    path: '/blog',
    element: <BlogListingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/blog/:slug',
    element: <BlogDetailPageWrapper />,
    errorElement: <ErrorPage />,
  },
]);

// Create a wrapper component to handle the slug parameter:
function BlogDetailPageWrapper() {
  const { slug } = useParams();
  return <BlogDetailPage postId={slug} />;
}

/*
Option B: If using <Routes> component
*/

import { Routes, Route, useParams } from 'react-router-dom';
import BlogListingPage from '@/features/blog/pages/BlogListingPage';
import BlogDetailPage from '@/features/blog/pages/BlogDetailPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* ... your existing routes ... */}
      
      <Route path="/blog" element={<BlogListingPage />} />
      <Route 
        path="/blog/:slug" 
        element={<BlogDetailPageWrapper />} 
      />
    </Routes>
  );
}

function BlogDetailPageWrapper() {
  const { slug } = useParams();
  return <BlogDetailPage postId={slug} />;
}

// ═════════════════════════════════════════════════════════════════════════════
// 🎯 STEP 4: UPDATE YOUR HOMEPAGE BLOG SECTION
// ═════════════════════════════════════════════════════════════════════════════

/*
Update your existing BlogsSection component to link to the new pages:

In BlogsSection.jsx, update the card click handlers:
*/

import { Link } from 'react-router-dom';

// Instead of href="#", use:
<Link to={`/blog/${post.slug}`} className={styles["blog-card__link"]}>
  {t("latest-insight.blog.blog-post-cta")}
  <ArrowRight className={styles["blog-card__arrow"]} size={16} />
</Link>

// And update the "Explore all insights" button:
<Link 
  to="/blog" 
  className={styles["blog-section__cta"]}
>
  {t("latest-insight.blog-section-cta")}
  <ArrowRight size={18} strokeWidth={2} />
</Link>

// ═════════════════════════════════════════════════════════════════════════════
// 🔌 STEP 5: BACKEND API INTEGRATION
// ═════════════════════════════════════════════════════════════════════════════

/*
The blog module uses mock data by default. To connect to your backend:

1. Create a service file: src/features/blog/services/blogApi.js
*/

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const api = axios.create({
  baseURL: `${API_BASE_URL}/blog`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all blog posts (with filters)
export const fetchBlogPosts = async (params = {}) => {
  try {
    const response = await api.get('/posts', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

// Fetch single blog post by slug
export const fetchBlogPost = async (slug) => {
  try {
    const response = await api.get(`/posts/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

// Fetch comments for a post
export const fetchPostComments = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Add a new comment
export const addComment = async (postId, commentData) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Upload media
export const uploadMedia = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// 🎣 STEP 6: UPDATE HOOKS TO USE API
// ═════════════════════════════════════════════════════════════════════════════

/*
Update hooks/useBlog.js to use your API service:

Example for useBlogDetail hook:
*/

import { useEffect, useState } from 'react';
import { fetchBlogPost } from '../services/blogApi';

export const useBlogDetail = (postId) => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBlogPost(postId);
        setPost(data);
        
        if (data.relatedPostIds) {
          const related = await Promise.all(
            data.relatedPostIds.map(id => fetchBlogPost(id))
          );
          setRelatedPosts(related);
        }
        setError(null);
      } catch (err) {
        setError(err.message);
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

// ═════════════════════════════════════════════════════════════════════════════
// 📊 STEP 7: BACKEND DATA STRUCTURE (EXPRESS.JS EXAMPLE)
// ═════════════════════════════════════════════════════════════════════════════

/*
Here's a recommended backend structure for your blog API:

routes/blog.js
*/

const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const upload = require('../middleware/upload');

// GET all blog posts with filters
router.get('/posts', async (req, res) => {
  try {
    const { category, page = 1, limit = 6, sort = 'newest' } = req.query;
    
    let filter = { published: true };
    if (category && category !== 'all') {
      filter.category = category;
    }

    const sortOrder = sort === 'newest' ? -1 : 1;
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find(filter)
      .sort({ publishedAt: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await BlogPost.countDocuments(filter);

    res.json({
      posts,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: parseInt(page),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single blog post by slug
router.get('/posts/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug })
      .populate('author', 'name role avatar')
      .populate('comments');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET comments for a post
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new comment
router.post('/posts/:postId/comments', async (req, res) => {
  try {
    const { authorName, authorEmail, content } = req.body;
    
    const comment = new Comment({
      postId: req.params.postId,
      authorName,
      authorEmail,
      content,
      createdAt: new Date(),
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST upload media
router.post('/media/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const mediaUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      id: req.file.filename,
      url: mediaUrl,
      type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
      size: req.file.size,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// ═════════════════════════════════════════════════════════════════════════════
// 📦 STEP 8: ENVIRONMENT VARIABLES
// ═════════════════════════════════════════════════════════════════════════════

/*
Create or update .env file:
*/

# .env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_DEFAULT_LANGUAGE=en

# ═════════════════════════════════════════════════════════════════════════════
# 🎓 STEP 9: USAGE EXAMPLES
// ═════════════════════════════════════════════════════════════════════════════

/*
In your navigation menu, add links to blog:
*/

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Navigation() {
  const { t } = useTranslation();

  return (
    <nav>
      {/* ... other nav items ... */}
      <Link to="/blog">{t('blogs.listing.title')}</Link>
    </nav>
  );
}

/*
To use the blog hooks in components:
*/

import { useBlogListing } from '@/features/blog/hooks/useBlog';

function MyComponent() {
  const {
    posts,
    totalPosts,
    setSearchQuery,
    setSelectedCategory,
  } = useBlogListing();

  return (
    <div>
      <h1>Found {totalPosts} articles</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          {/* ... */}
        </article>
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 🔐 STEP 10: SECURITY & SEO
// ═════════════════════════════════════════════════════════════════════════════

/*
Add SEO meta tags to blog pages:
*/

import { Helmet } from 'react-helmet';

function BlogDetailPage({ post }) {
  return (
    <>
      <Helmet>
        <title>{post.title} | FinPay Blog</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="author" content={post.author.name} />
        <link rel="canonical" href={`https://yoursite.com/blog/${post.slug}`} />
      </Helmet>
      {/* ... rest of component */}
    </>
  );
}

/*
Sanitize user content to prevent XSS:
*/

import DOMPurify from 'dompurify';

const sanitizedContent = DOMPurify.sanitize(userComment);

// ═════════════════════════════════════════════════════════════════════════════
// 📱 MOBILE RESPONSIVENESS
// ═════════════════════════════════════════════════════════════════════════════

/*
All components are fully responsive. Test with:
- iPhone SE (375px)
- iPad (768px)
- Desktop (1200px+)

CSS media queries are included for:
@media (max-width: 768px) - tablets
@media (max-width: 480px) - mobile phones
*/

// ═════════════════════════════════════════════════════════════════════════════
// 🧪 TESTING CHECKLIST
// ═════════════════════════════════════════════════════════════════════════════

/*
Before deploying, test:

Functionality:
- [ ] Blog listing page loads with posts
- [ ] Search works correctly
- [ ] Filters by category work
- [ ] Pagination navigates correctly
- [ ] Featured posts display
- [ ] Blog detail page loads individual posts
- [ ] Comments can be submitted
- [ ] Media gallery opens/closes
- [ ] Related articles show
- [ ] Print article works
- [ ] Download as PDF works (optional)

Bilingual Support:
- [ ] Toggle language changes all text
- [ ] Date formatting matches language
- [ ] No hardcoded English strings

Responsive Design:
- [ ] Mobile: All content is readable
- [ ] Tablet: Layout adjusts correctly
- [ ] Desktop: Full layout works
- [ ] Touch targets are at least 44x44px

Performance:
- [ ] Images are optimized
- [ ] Lazy loading works
- [ ] No console errors
- [ ] Load time < 3 seconds

Security:
- [ ] No XSS vulnerabilities
- [ ] CSRF tokens on forms
- [ ] Rate limiting on comments
- [ ] Email validation
*/

// ═════════════════════════════════════════════════════════════════════════════
// 🆘 TROUBLESHOOTING
// ═════════════════════════════════════════════════════════════════════════════

/*
Issue: Blog pages not displaying
Solution: 
1. Check routes are properly configured
2. Ensure components are in correct paths
3. Check browser console for errors
4. Verify translations are loaded

Issue: Images not loading
Solution:
1. Check image URLs in blogData.js
2. Ensure images are publicly accessible
3. Check CORS settings if using external images

Issue: Comments not showing
Solution:
1. Verify API endpoint is working
2. Check data structure matches interface
3. Test with mock data first

Issue: Bilingual content not switching
Solution:
1. Check i18n configuration
2. Verify language is being set in store/context
3. Check translation keys exist in both languages
4. Clear browser cache and reload
*/

// ═════════════════════════════════════════════════════════════════════════════
// 📚 ADDITIONAL RESOURCES
// ═════════════════════════════════════════════════════════════════════════════

/*
Documentation:
- React: https://react.dev
- React Router: https://reactrouter.com
- React i18n: https://www.i18next.com
- Lucide Icons: https://lucide.dev
- Express.js: https://expressjs.com

Tools:
- Color Palette: https://colorhunt.co
- Icon Sets: https://lucide.dev
- Font Pairing: https://www.fontpair.co
*/

export const BLOG_SETUP_COMPLETE = true;
