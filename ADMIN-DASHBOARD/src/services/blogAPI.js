import apiClient from './apiClient';

const blogAPI = {
  getBlogs: async (params = {}) => {
    const response = await apiClient.get('/api/blogs', { params });
    return response.data.data;
  },

  getCategories: async () => {
    const response = await apiClient.get('/api/blogs/categories');
    return response.data.data.categories;
  },

  getBlogBySlug: async (slug) => {
    const response = await apiClient.get(`/api/blogs/${slug}`);
    return response.data.data.blog;
  },

  createBlog: async (blogData) => {
    const response = await apiClient.post('/api/blogs', blogData);
    return response.data.data.blog;
  },

  updateBlog: async (blogId, blogData) => {
    const response = await apiClient.put(`/api/blogs/${blogId}`, blogData);
    return response.data.data.blog;
  },

  deleteBlog: async (blogId) => {
    const response = await apiClient.delete(`/api/blogs/${blogId}`);
    return response.data;
  },

  uploadCoverImage: async (blogId, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await apiClient.post(`/api/blogs/${blogId}/upload-cover`, formData);
    return response.data.data;
  },

  uploadImages: async (blogId, imageFiles) => {
    const formData = new FormData();
    imageFiles.forEach((file) => formData.append('images', file));
    const response = await apiClient.post(`/api/blogs/${blogId}/upload-images`, formData);
    return response.data.data;
  },

  deleteImage: async (blogId, imageIndex) => {
    const response = await apiClient.delete(`/api/blogs/${blogId}/images/${imageIndex}`);
    return response.data;
  },
};

export default blogAPI;
