import apiClient from './apiClient';

const authAPI = {
  login: async (credentials) => {
    return await apiClient.post('/api/auth/login', credentials);
  },

  getMe: async () => {
    return await apiClient.get('/api/auth/me');
  },

  logout: async () => {
    return await apiClient.post('/api/auth/logout');
  }
};

export default authAPI;
