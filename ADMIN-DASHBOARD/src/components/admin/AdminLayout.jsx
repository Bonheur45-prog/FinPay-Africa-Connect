import React, { useEffect } from 'react';
import { Outlet, Navigate, NavLink, useNavigate } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LayoutDashboard, FileText, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/useAuthStore.js';
import authAPI from '../../services/authAPI.js';
import styles from './AdminLayout.module.css';

const NAV_LINKS = [
  { to: '/admin/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/admin/blogs',     label: 'Blogs',     Icon: FileText },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const token  = useAuthStore((s) => s.token);
  const user   = useAuthStore((s) => s.user);
  const setUser  = useAuthStore((s) => s.setUser);
  const logout   = useAuthStore((s) => s.logout);

  // Fetch current user info once we have a token
  const { data, error } = useQuery({
    queryKey: ['admin', 'me'],
    queryFn: authAPI.getMe,
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data?.user) setUser(data.user);
  }, [data, setUser]);

  // If the /me call comes back 401, the token is dead — log out silently
  useEffect(() => {
    if (error) {
      logout();
      navigate('/admin/login', { replace: true });
    }
  }, [error, logout, navigate]);

  if (!token) return <Navigate to="/admin/login" replace />;

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } finally {
      logout();
      queryClient.clear();
      toast.success('Logged out successfully');
      navigate('/admin/login', { replace: true });
    }
  };

  const displayName = user?.username || user?.email || 'Admin';
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className={styles.layout}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>FP</span>
            <span className={styles.logoText}>FinPay CMS</span>
          </div>
          <button
            className={styles.closeSidebar}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className={styles.nav}>
          {NAV_LINKS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.userMeta}>
              <p className={styles.userName}>{displayName}</p>
              <p className={styles.userRole}>{user?.role || 'admin'}</p>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className={styles.topbarRight}>
            <span className={styles.topbarUser}>{displayName}</span>
          </div>
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
