/**
 * INTEGRATION GUIDE — App.jsx (or your router file)
 *
 * Add these admin routes inside your existing <BrowserRouter> / createBrowserRouter.
 * The example below assumes you already have public routes defined and just need
 * to slot in the admin section.
 *
 * Required packages (if not already installed):
 *   npm install react-router @tanstack/react-query zustand react-hot-toast lucide-react
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Admin components
import AdminLayout from './admin/AdminLayout';
import Login      from './admin/Login';
import Dashboard  from './admin/Dashboard';
import Blogs      from './admin/Blogs';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Global toast container — render once at the app root */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { borderRadius: '8px', fontSize: '0.875rem' },
            success: { duration: 3000 },
            error:   { duration: 5000 },
          }}
        />

        <Routes>
          {/* ── Public routes ────────────────────────── */}
          {/* <Route path="/" element={<PublicHome />} /> */}
          {/* <Route path="/blog" element={<BlogListing />} /> */}
          {/* <Route path="/blog/:slug" element={<BlogDetail />} /> */}

          {/* ── Admin auth ───────────────────────────── */}
          <Route path="/admin/login" element={<Login />} />

          {/* ── Protected admin layout ───────────────── */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blogs"     element={<Blogs />} />
            {/* Future modules: */}
            {/* <Route path="partners"  element={<Partners />} /> */}
            {/* <Route path="investors" element={<Investors />} /> */}
          </Route>

          {/* ── Fallback ─────────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
