import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5050',
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  console.log('[apiClient] Token from storage:', token ? `${token.substring(0, 20)}...` : 'NOT FOUND');
  console.log('[apiClient] Request to:', config.baseURL + config.url);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[apiClient] Authorization header set');
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Network error';
    console.error('[apiClient] Response error:', { status, message, url: error.config?.url });
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
