import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('adminToken') || null,
  user: null,

  setAuth: (token, user) => {
    console.log('[auth] setAuth called with:', { token: token ? `${token.substring(0, 20)}...` : 'undefined', user });
    localStorage.setItem('adminToken', token);
    set({ token, user });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    console.log('[auth] logout called');
    localStorage.removeItem('adminToken');
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
