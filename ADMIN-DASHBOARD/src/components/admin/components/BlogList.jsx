import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, Search, Eye, Edit2, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import toast from 'react-hot-toast';
import blogAPI from '../../services/blogAPI';
import styles from './BlogList.module.css';

const STATUS_TABS = ['all', 'published', 'draft', 'archived'];

const STATUS_COLORS = {
  published: { bg: '#D1FAE5', text: '#065F46' },
  draft:     { bg: '#FEF3C7', text: '#92400E' },
  archived:  { bg: '#F1F5F9', text: '#475569' },
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function BlogList({ onNew, onEdit }) {
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState('all');
  const [search,       setSearch]       = useState('');
  const [page,         setPage]         = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null); // blog object to confirm delete

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-blogs', statusFilter, search, page],
    queryFn: () =>
      blogAPI.getBlogs({
        status: statusFilter === 'all' ? 'all' : statusFilter,
        search: search.trim() || undefined,
        page,
        limit: 10,
        sort: '-createdAt',
      }),
    staleTime: 1000 * 30,
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => blogAPI.deleteBlog(id),
    onSuccess: () => {
      toast.success('Blog deleted successfully');
      setDeleteTarget(null);
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'blogStats'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete blog');
    },
  });

  const blogs      = data?.blogs ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.pages ?? 1;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (s) => {
    setStatusFilter(s);
    setPage(1);
  };

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Blogs</h1>
          <p className={styles.subtitle}>
            {pagination?.total ?? 0} total post{pagination?.total !== 1 ? 's' : ''}
          </p>
        </div>
        <button className={styles.newBtn} onClick={onNew}>
          <PlusCircle size={16} />
          New Blog
        </button>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        {/* Status tabs */}
        <div className={styles.statusTabs}>
          {STATUS_TABS.map((s) => (
            <button
              key={s}
              className={`${styles.statusTab} ${statusFilter === s ? styles.statusTabActive : ''}`}
              onClick={() => handleStatusChange(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className={styles.searchBox}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search blogs…"
            value={search}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => { setSearch(''); setPage(1); }}>
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        {isLoading && (
          <div className={styles.loadingRow}>
            <div className={styles.spinner} />
            <span>Loading blogs…</span>
          </div>
        )}

        {error && (
          <div className={styles.errorRow}>
            <p>{error.message || 'Failed to load blogs'}</p>
          </div>
        )}

        {!isLoading && !error && blogs.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No blogs found</p>
            <p className={styles.emptyDesc}>
              {search ? 'Try a different search term.' : 'Create your first blog post.'}
            </p>
            {!search && (
              <button className={styles.newBtn} onClick={onNew}>
                <PlusCircle size={15} /> Create Blog
              </button>
            )}
          </div>
        )}

        {!isLoading && blogs.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Post</th>
                <th>Category</th>
                <th>Status</th>
                <th>Views</th>
                <th>Date</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className={styles.row}>
                  {/* Post cell */}
                  <td className={styles.postCell}>
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt="" className={styles.thumb} />
                    ) : (
                      <div className={styles.thumbPlaceholder}>
                        <span>{blog.title?.en?.[0] ?? '?'}</span>
                      </div>
                    )}
                    <div className={styles.postInfo}>
                      <p className={styles.postTitle}>{blog.title?.en || 'Untitled'}</p>
                      <p className={styles.postSlug}>/{blog.slug}</p>
                    </div>
                  </td>

                  {/* Category */}
                  <td>
                    <span className={styles.categoryBadge}>{blog.category}</span>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={styles.statusBadge}
                      style={{
                        background: STATUS_COLORS[blog.status]?.bg ?? '#F1F5F9',
                        color:      STATUS_COLORS[blog.status]?.text ?? '#475569',
                      }}
                    >
                      {blog.status}
                    </span>
                  </td>

                  {/* Views */}
                  <td className={styles.viewsCell}>
                    <Eye size={13} />
                    {(blog.views || 0).toLocaleString()}
                  </td>

                  {/* Date */}
                  <td className={styles.dateCell}>{formatDate(blog.createdAt)}</td>

                  {/* Actions */}
                  <td className={styles.actionsCell}>
                    <button
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                      onClick={() => onEdit(blog)}
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => setDeleteTarget(blog)}
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <span className={styles.pageInfo}>
            Page {page} of {totalPages}
          </span>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Delete Blog</h3>
            <p className={styles.modalBody}>
              Are you sure you want to permanently delete{' '}
              <strong>"{deleteTarget.title?.en || 'this blog'}"</strong>?
              This will also remove all associated images from Cloudinary.
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setDeleteTarget(null)}
                disabled={deleteMutation.isPending}
              >
                Cancel
              </button>
              <button
                className={styles.confirmDeleteBtn}
                onClick={() => deleteMutation.mutate(deleteTarget._id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <span className={styles.spinnerSm} />
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
