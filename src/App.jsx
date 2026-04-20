import React from 'react'
import { Routes, Route, Navigate } from 'react-router';
import LangWrapper from './components/LangWrapper/LangWrapper';
import Layout from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { SolutionsPage } from './pages/SolutionsPage';
import SolutionPage from './pages/SolutionPage';
import Partners from './pages/Partners';
import Investors from './pages/Investors';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/fr" replace />} />

      <Route path="/:lang" element={<LangWrapper />}>
        <Route element={<Layout />}>
          <Route index         element={<HomePage />} />
          <Route path="about"  element={<AboutUsPage />} />
          {/* add more here as you build pages */}

          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="solutions/:slug" element={<SolutionPage />} />
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