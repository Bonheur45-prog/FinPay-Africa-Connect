import React from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { FileText, BookOpen, Edit3, Eye, PlusCircle, ArrowRight } from 'lucide-react';
import blogAPI from '../services/blogAPI';
import styles from './Dashboard.module.css';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className={styles.statCard}>
    <div className={styles.statIcon} style={{ background: color + '18', color }}>
      <Icon size={20} />
    </div>
    <div>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  </div>
);

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const STATUS_COLORS = { published: '#10B981', draft: '#F59E0B', archived: '#94A3B8' };

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'blogStats'],
    queryFn: () => blogAPI.getBlogs({ status: 'all', limit: 100 }),
    staleTime: 1000 * 60,
    retry: false,
  });

  const blogs = data?.blogs ?? [];
  const total     = blogs.length;
  const published = blogs.filter((b) => b.status === 'published').length;
  const drafts    = blogs.filter((b) => b.status === 'draft').length;
  const views     = blogs.reduce((s, b) => s + (b.views || 0), 0);
  const recent    = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorWrap}>
        <p>Unable to load dashboard data. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back — here's your content overview.</p>
        </div>
        <Link to="/admin/blogs" className={styles.newBlogBtn}>
          <PlusCircle size={16} />
          New Blog
        </Link>
      </div>

      <div className={styles.statsGrid}>
        <StatCard icon={FileText}  label="Total Blogs"   value={total}                   color="#6366F1" />
        <StatCard icon={BookOpen}  label="Published"     value={published}               color="#10B981" />
        <StatCard icon={Edit3}     label="Drafts"        value={drafts}                  color="#F59E0B" />
        <StatCard icon={Eye}       label="Total Views"   value={views.toLocaleString()}  color="#0EA5E9" />
      </div>

      <div className={styles.sectionsRow}>
        {/* Recent blogs */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Blogs</h2>
            <Link to="/admin/blogs" className={styles.seeAll}>
              See all <ArrowRight size={14} />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className={styles.empty}>
              <p>No blogs yet.</p>
              <Link to="/admin/blogs" className={styles.emptyLink}>Create your first blog →</Link>
            </div>
          ) : (
            <div className={styles.blogList}>
              {recent.map((blog) => (
                <div key={blog._id} className={styles.blogItem}>
                  {blog.coverImage && (
                    <img src={blog.coverImage} alt="" className={styles.blogThumb} />
                  )}
                  <div className={styles.blogInfo}>
                    <p className={styles.blogTitle}>{blog.title?.en || 'Untitled'}</p>
                    <p className={styles.blogMeta}>
                      <span className={styles.category}>{blog.category}</span>
                      <span>·</span>
                      <span>{formatDate(blog.createdAt)}</span>
                    </p>
                  </div>
                  <span
                    className={styles.statusBadge}
                    style={{ background: STATUS_COLORS[blog.status] + '18', color: STATUS_COLORS[blog.status] }}
                  >
                    {blog.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className={styles.quickActions}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Quick Actions</h2>
          <Link to="/admin/blogs" className={styles.actionCard}>
            <PlusCircle size={20} />
            <div>
              <p className={styles.actionTitle}>Create Blog</p>
              <p className={styles.actionDesc}>Write a new post</p>
            </div>
          </Link>
          <Link to="/admin/blogs?status=draft" className={styles.actionCard}>
            <Edit3 size={20} />
            <div>
              <p className={styles.actionTitle}>Edit Drafts</p>
              <p className={styles.actionDesc}>{drafts} draft{drafts !== 1 ? 's' : ''} pending</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
