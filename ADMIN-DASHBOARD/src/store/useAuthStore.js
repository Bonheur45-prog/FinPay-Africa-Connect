import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('adminToken') || null,
  user: null,

  setAuth: (token, user) => {
    localStorage.setItem('adminToken', token);
    set({ token, user });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem('adminToken');
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
