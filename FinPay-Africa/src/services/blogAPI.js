import apiClient from './apiClient';

class BlogAPI {
  async getBlogs(params = {}) {
    const response = await apiClient.get('/api/blogs', { params });
    return response;
  }

  async getCategories() {
    const response = await apiClient.get('/api/blogs/categories');
    return response.categories;
  }

  async getBlogBySlug(slug) {
    const response = await apiClient.get(`/api/blogs/${slug}`);
    return response.blog;
  }

  async createBlog(blogData) {
    const response = await apiClient.post('/api/blogs', blogData);
    return response.blog;
  }

  async updateBlog(blogId, blogData) {
    const response = await apiClient.put(`/api/blogs/${blogId}`, blogData);
    return response.blog;
  }

  async deleteBlog(blogId) {
    const response = await apiClient.delete(`/api/blogs/${blogId}`);
    return response;
  }

  async uploadCoverImage(blogId, imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await apiClient.post(`/api/blogs/${blogId}/upload-cover`, formData);

    return response.data;
  }

  async uploadImages(blogId, imageFiles) {
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    const response = await apiClient.post(`/api/blogs/${blogId}/upload-images`, formData);

    return response.data;
  }

  async deleteImage(blogId, imageIndex) {
    const response = await apiClient.delete(`/api/blogs/${blogId}/images/${imageIndex}`);
    return response.data;
  }
}

const blogAPI = new BlogAPI();
export default blogAPI;
