import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import BlogList   from './components/BlogList';
import BlogEditor from './components/BlogEditor';
import styles from './Blogs.module.css';

/**
 * Blogs page — manages the three possible views:
 *   'list'   → show BlogList
 *   'create' → show BlogEditor (new blog)
 *   'edit'   → show BlogEditor (existing blog)
 */
export default function Blogs() {
  const [view, setView]           = useState('list');   // 'list' | 'create' | 'edit'
  const [editingBlog, setEditingBlog] = useState(null);

  const openCreate = () => {
    setEditingBlog(null);
    setView('create');
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);
    setView('edit');
  };

  const backToList = () => {
    setEditingBlog(null);
    setView('list');
  };

  return (
    <div className={styles.page}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: '8px', fontSize: '0.875rem' },
          success: { duration: 3000 },
          error:   { duration: 5000 },
        }}
      />

      {view === 'list' && (
        <BlogList onNew={openCreate} onEdit={openEdit} />
      )}

      {(view === 'create' || view === 'edit') && (
        <BlogEditor
          blog={editingBlog}
          onClose={backToList}
        />
      )}
    </div>
  );
}
