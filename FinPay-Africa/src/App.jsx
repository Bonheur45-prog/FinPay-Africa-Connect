import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router';
import LangWrapper from './components/LangWrapper/LangWrapper';
import Layout from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { SolutionsPage } from './pages/SolutionsPage';
import SolutionPage from './pages/SolutionPage';
import Partners from './pages/Partners';
import Investors from './pages/Investors';
import ContactUs from './pages/ContactUs';
import BlogListingPage from './features/blog/pages/BlogListingPage';
import BlogDetailPage from './features/blog/pages/BlogDetailPage';

function BlogDetailPageWrapper() {
  const { slug } = useParams();
  return <BlogDetailPage postId={slug} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/fr" replace />} />

      {/* Public Routes */}
      <Route path="/:lang" element={<LangWrapper />}>
        <Route element={<Layout />}>
          <Route index         element={<HomePage />} />
          <Route path="about"  element={<AboutUsPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="solutions/:slug" element={<SolutionPage />} />
          <Route path="blog" element={<BlogListingPage />} />
          <Route path="blog/:slug" element={<BlogDetailPageWrapper />} />
          <Route path="partners"  element={<Partners />} />
          <Route path="investors" element={<Investors />} />
          <Route path="contact-us"   element={<ContactUs />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/fr" replace />} />
    </Routes>
  )
}

export default App